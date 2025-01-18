import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { AppDataSource } from "../data-source";
import { MatchReferees } from "../entity/MatchReferees";
import { Matches } from "../entity/Matches";
import { Referee } from "../entity/Referees";

@Resolver(() => MatchReferees)
export class MatchRefereesResolver {
    @Query(() => [MatchReferees])
    async getMatchRefereess() {
        return await AppDataSource.getRepository(MatchReferees).find();
    }

    @Query(() => MatchReferees, { nullable: true })
    async getMatchReferees(@Arg("id", () => ID) id: number) {
        return await AppDataSource.getRepository(MatchReferees).findOneBy({ id });
    }

    @Mutation(() => MatchReferees)
    async createMatchReferees(
        @Arg("matchId", () => ID) matchId: number,
        @Arg("refereeId", () => ID) refereeId: number,
    ) {
        const matches = await AppDataSource.getRepository(Matches).findOneBy({ id: matchId });
        if (!matches) throw new Error("Matches not found");

        const referee = await AppDataSource.getRepository(Referee).findOneBy({ id: refereeId });
        if (!referee) throw new Error("Referee not found");

        const newMatchReferees = AppDataSource.getRepository(MatchReferees).create({ matches, referee });
        return await AppDataSource.getRepository(MatchReferees).save(newMatchReferees);
    }

    @Mutation(() => MatchReferees, { nullable: true })
    async updateMatchReferees(
        @Arg("id", () => ID) id: number,
        @Arg("matchId", () => ID) matchId: number,
        @Arg("refereeId", () => ID) refereeId: number,
    ) {
        const matchreferees = await AppDataSource.getRepository(MatchReferees).findOneBy({ id });
        if (!matchreferees) throw new Error("MatchReferees not found");

        if (matchId) {
            const matches = await AppDataSource.getRepository(Matches).findOneBy({ id: matchId });
            if (!matches) throw new Error("Match not found");
            matchreferees.matches = matches;
        }

        if(refereeId) {
            const referee = await AppDataSource.getRepository(Referee).findOneBy({ id: refereeId });
            if (!referee) throw new Error("Referee not found");
            matchreferees.referee = referee;
        }

        return await AppDataSource.getRepository(MatchReferees).save(matchreferees);
    }

    @Mutation(() => Boolean)
    async deleteMatchReferees(@Arg("id", () => ID) id: number) {
        const result = await AppDataSource.getRepository(MatchReferees).delete(id);
        return result.affected !== 0;
    }
}
