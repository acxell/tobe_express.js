import { Resolver, Query, Mutation, Arg, ID, GraphQLISODateTime, Int } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Club } from "../entity/Club";
import { Matches } from "../entity/Matches";
import { League } from "../entity/League";

@Resolver(() => Matches)
export class MatchesResolver {
    @Query(() => [Matches])
    async getMatchess() {
        return await AppDataSource.getRepository(Matches).find();
    }

    @Query(() => Matches, { nullable: true })
    async getMatches(@Arg("id", () => ID) id: number) {
        return await AppDataSource.getRepository(Matches).findOneBy({ id });
    }

    @Mutation(() => Matches)
    async createMatches(
        @Arg("homeClubId", () => ID) homeClubId: number,
        @Arg("awayClubId", () => ID) awayClubId: number,
        @Arg("cup_name") cup_name: string,
        @Arg("home_score", () => Int) home_score: number,
        @Arg("away_score", () => Int) away_score: number,
        @Arg("match_date", () => GraphQLISODateTime) match_date: Date,
    ) {
        const home_club = await AppDataSource.getRepository(Club).findOneBy({ id: homeClubId });
        if (!home_club) throw new Error("Home Club not found");

        const away_club = await AppDataSource.getRepository(Club).findOneBy({ id: awayClubId });
        if (!away_club) throw new Error("Away Club not found");

        // Perlu Validasi Home Away tidak boleh sama

        const newMatches = AppDataSource.getRepository(Matches).create({ home_club, away_club, cup_name, home_score, away_score, match_date });
        return await AppDataSource.getRepository(Matches).save(newMatches);
    }

    @Mutation(() => Matches, { nullable: true })
    async updateMatches(
        @Arg("id", () => ID) id: number,
        @Arg("homeClubId", () => ID, { nullable: true }) homeClubId?: number,
        @Arg("awayClubId", () => ID, { nullable: true }) awayClubId?: number,
        @Arg("cup_name", { nullable: true }) cup_name?: string,
        @Arg("home_score", () => Int, { nullable: true }) home_score?: number,
        @Arg("away_score", () => Int, { nullable: true }) away_score?: number,
        @Arg("match_date", () => GraphQLISODateTime, { nullable: true }) match_date?: Date
    ) {
        const matches = await AppDataSource.getRepository(Matches).findOneBy({ id });
        if (!matches) throw new Error("Matches not found");

        if (homeClubId) {
            const home_club = await AppDataSource.getRepository(Club).findOneBy({ id: homeClubId });
            if (!home_club) throw new Error("Home Club not found");
            matches.home_club = home_club;
        }

        if (awayClubId) {
            const away_club = await AppDataSource.getRepository(Club).findOneBy({ id: awayClubId });
            if (!away_club) throw new Error("Away Club not found");
            matches.away_club = away_club;
        }

        if (cup_name) matches.cup_name = cup_name;
        if (home_score !== undefined) matches.home_score = home_score;
        if (away_score !== undefined) matches.away_score = away_score;
        if (match_date) matches.match_date = match_date;

        return await AppDataSource.getRepository(Matches).save(matches);
    }

    @Mutation(() => Boolean)
    async deleteMatches(@Arg("id", () => ID) id: number) {
        const result = await AppDataSource.getRepository(Matches).delete(id);
        return result.affected !== 0;
    }
}
