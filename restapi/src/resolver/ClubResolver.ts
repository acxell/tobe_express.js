import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Club } from "../entity/Club";
import { League } from "../entity/League";

@Resolver(() => Club)
export class ClubResolver {
    @Query(() => [Club])
    async getClubs() {
        return await AppDataSource.getRepository(Club).find();
    }

    @Query(() => Club, { nullable: true })
    async getClub(@Arg("id", () => ID) id: number) {
        return await AppDataSource.getRepository(Club).findOneBy({ id });
    }

    @Mutation(() => Club)
    async createClub(
        @Arg("name") name: string,
        @Arg("stadium_name") stadium_name: string,
        @Arg("leagueId", () => ID) leagueId: number
    ) {
        const league = await AppDataSource.getRepository(League).findOneBy({ id: leagueId });
        if (!league) throw new Error("League not found");

        const newClub = AppDataSource.getRepository(Club).create({ name, stadium_name, league });
        return await AppDataSource.getRepository(Club).save(newClub);
    }

    @Mutation(() => Club, { nullable: true })
    async updateClub(
        @Arg("id", () => ID) id: number,
        @Arg("name", { nullable: true }) name?: string,
        @Arg("stadium_name", { nullable: true }) stadium_name?: string,
        @Arg("leagueId", () => ID, { nullable: true }) leagueId?: number
    ) {
        const club = await AppDataSource.getRepository(Club).findOneBy({ id });
        if (!club) throw new Error("Club not found");

        if (name) club.name = name;
        if (stadium_name) club.stadium_name = stadium_name;

        if (leagueId) {
            const league = await AppDataSource.getRepository(League).findOneBy({ id: leagueId });
            if (!league) throw new Error("League not found");
            club.league = league;
        }

        return await AppDataSource.getRepository(Club).save(club);
    }

    @Mutation(() => Boolean)
    async deleteClub(@Arg("id", () => ID) id: number) {
        const result = await AppDataSource.getRepository(Club).delete(id);
        return result.affected !== 0;
    }
}
