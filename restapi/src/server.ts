import "reflect-metadata";
import { AppDataSource } from "./data-source";  // TypeORM Data Source
import * as express from "express";
import { createServer } from "http";
import * as BodyParser from "body-parser";
import * as cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Server as SocketIOServer } from "socket.io";
import { Matches } from "./entity/Matches";
import { ClubResolver } from "./resolver/ClubResolver";
import { MatchesResolver } from "./resolver/MatchesResolver";
import Redis from "ioredis";

const redis = new Redis();
const redisPub = new Redis();
const redisSub = new Redis(); 

AppDataSource.initialize().then(async () => {
    const app = express();
    const server = createServer();
    server.on("request", app);
    const io = new SocketIOServer(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    app.use(cors());
    app.use(BodyParser.json());

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    app.set("io", io);

    const schema = await buildSchema({
        resolvers: [ClubResolver, MatchesResolver],
        validate: false,
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res, io, redis }),
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const broadcastMatchUpdates = async () => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0); 
    
        const endOfTomorrow = new Date(tomorrow);
        endOfTomorrow.setHours(23, 59, 59, 999);

        const cachedMatches = await redis.get("upcoming_matches");
        if (cachedMatches) {
            console.log("✅ Using cached match data from Redis.");
            io.emit("match_notification", JSON.parse(cachedMatches));
            return;
        }

        const upcomingMatches = await AppDataSource.getRepository(Matches)
            .createQueryBuilder("match")
            .where("match.match_date BETWEEN :start AND :end", {
                start: tomorrow.toISOString(),
                end: endOfTomorrow.toISOString()
            })
            .leftJoinAndSelect("match.home_club", "home")
            .leftJoinAndSelect("match.away_club", "away")
            .getMany();
    
        if (upcomingMatches.length > 0) {
            const matchData = upcomingMatches.map((match) => ({
                id: match.id,
                home_team: match.home_club?.name || "Unknown",
                away_team: match.away_club?.name || "Unknown",
                cup_name: match.cup_name,
                match_date: match.match_date,
            }));

            const matchPayload = {
                type: "MATCH_UPDATE",
                message: "Jadwal pertandingan besok!",
                matches: matchData,
            };

            await redis.set("upcoming_matches", JSON.stringify(matchPayload), "EX", 60);

            redisPub.publish("match_updates", JSON.stringify(matchPayload));

            io.emit("match_notification", matchPayload);
            console.log("Real-time match update sent:", matchData);
        } else {
            console.log("Tidak ada pertandingan untuk besok.");
        }
    };
    
    redisSub.subscribe("match_updates", (err) => {
        if (err) {
            console.error("Failed to subscribe to match_updates channel:", err);
        } else {
            console.log("Subscribed to match_updates channel.");
        }
    });

    redisSub.on("message", (channel, message) => {
        if (channel === "match_updates") {
            console.log("Redis Pub/Sub received update:", JSON.parse(message));
            io.emit("match_notification", JSON.parse(message));
        }
    });

    setInterval(broadcastMatchUpdates, 60 * 1000);

    app.get("/matches/upcoming", async (req, res) => {
        try {
            const cachedMatches = await redis.get("upcoming_matches");
            if (cachedMatches) {
                console.log("Serving upcoming matches from Redis cache.");
                return res.json(JSON.parse(cachedMatches));
            }

            return res.json({
                success: true,
                message: "No matches for tomorrow.",
                matches: []
            });

        } catch (error) {
            console.error("Error fetching matches:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    });

    server.listen(8080, () => {
        console.log(`REST API running on http://localhost:8080/`);
        console.log(`GraphQL Playground available at http://localhost:8080/graphql`);
        console.log(`WebSocket Server running on ws://localhost:8080`);
        console.log(`Redis caching and Pub/Sub enabled!`);
    });

}).catch(error => console.log("Error starting server:", error));
