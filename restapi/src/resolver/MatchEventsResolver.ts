import { Resolver, Query, Mutation, Arg, ID, Int } from "type-graphql";
import { AppDataSource } from "../data-source";
import { MatchEvents } from "../entity/MatchEvents";
import { Matches } from "../entity/Matches";
import { Player } from "../entity/Player";

@Resolver(() => MatchEvents)
export class MatchEventsResolver {
    @Query(() => [MatchEvents])
    async getMatchEventss() {
        return await AppDataSource.getRepository(MatchEvents).find();
    }

    @Query(() => MatchEvents, { nullable: true })
    async getMatchEvents(@Arg("id", () => ID) id: number) {
        return await AppDataSource.getRepository(MatchEvents).findOneBy({ id });
    }

    // @Query(() => [MatchEvents])
    // async searchMatchEvents(@Arg("query") query: string) {
    //     const result = await client.search({
    //         index: 'match_events',
    //         body: {
    //             query: {
    //                 multi_match: {
    //                     query,
    //                     fields: ["event_type", "player.name", "matches.id"]
    //                 }
    //             }
    //         }
    //     });

    //     const hits = result.hits.hits;
    //     return hits.map((hit: any) => hit._source);
    // }

    @Mutation(() => MatchEvents)
    async createMatchEvents(
        @Arg("matchId", () => ID) matchId: number,
        @Arg("event_type") event_type: string,
        @Arg("playerId", () => ID, { nullable: true }) playerId: number,
        @Arg("minute", () => Int) minute: number,
    ) {
        const matches = await AppDataSource.getRepository(Matches).findOneBy({ id: matchId });
        if (!matches) throw new Error("Match not found");

        const player = await AppDataSource.getRepository(Player).findOneBy({ id: playerId });
        if (!player) throw new Error("Player not found");

        const newMatchEvents = AppDataSource.getRepository(MatchEvents).create({ event_type, player, minute, matches });
        return await AppDataSource.getRepository(MatchEvents).save(newMatchEvents);
    }

    @Mutation(() => MatchEvents, { nullable: true })
    async updateMatchEvents(
        @Arg("id", () => ID) id: number,
        @Arg("matchId", () => ID, { nullable: true }) matchId: number,
        @Arg("event_type", { nullable: true }) event_type: string,
        @Arg("playerId", () => ID, { nullable: true }) playerId: number,
        @Arg("minute", () => Int, { nullable: true }) minute: number,
    ) {
        const matchevents = await AppDataSource.getRepository(MatchEvents).findOneBy({ id });
        if (!matchevents) throw new Error("MatchEvents not found");

        if (matchId) {
            const match = await AppDataSource.getRepository(Matches).findOneBy({ id: matchId });
            if (!match) throw new Error("Match not found");
            matchevents.matches = match;
        }

        if (playerId) {
            const player = await AppDataSource.getRepository(Player).findOneBy({ id: playerId });
            if (!player) throw new Error("Player not found");
            matchevents.player = player;
        }

        if (event_type) matchevents.event_type = event_type;
        if (minute) matchevents.minute = minute;

        return await AppDataSource.getRepository(MatchEvents).save(matchevents);
    }

    @Mutation(() => Boolean)
    async deleteMatchEvents(@Arg("id", () => ID) id: number) {
        const result = await AppDataSource.getRepository(MatchEvents).delete(id);
        return result.affected !== 0;
    }
}
