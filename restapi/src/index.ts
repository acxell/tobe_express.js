import { AppDataSource } from "./data-source"
import * as express from "express";
import * as BodyParser from "body-parser";
import * as cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolver/PostResolver";
import postRoutes from './routes/postRoutes';
import { ClubResolver } from "./resolver/ClubResolver";
import { LeagueResolver } from "./resolver/LeagueResolver";
import { PlayerResolver } from "./resolver/PlayerResolver";
import { MatchesResolver } from "./resolver/MatchesResolver";
import { ManagerResolver } from "./resolver/ManagerResolver";

AppDataSource.initialize().then(async () => {

    const app = express();
    app.use(cors());
    app.use(BodyParser.json());

    app.use('/', postRoutes);

    const schema = await buildSchema({
        resolvers: [PostResolver, ClubResolver, LeagueResolver, PlayerResolver, MatchesResolver, ManagerResolver],
        validate: false,
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(8080, () => {
        console.log(`REST API running on http://localhost:8080/`);
        console.log(`GraphQL Playground available at http://localhost:8080/graphql`);
    });

}).catch(error => console.log(error))
