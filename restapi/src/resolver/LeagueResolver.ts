import { Resolver, Query, Mutation, Arg, ID, GraphQLISODateTime } from "type-graphql";
import { AppDataSource } from "../data-source";
import { League } from "../entity/League";

@Resolver(() => League)
export class LeagueResolver {
    @Query(() => [League])
    async getLeagues() {
        return await AppDataSource.getRepository(League).find();
    }

    @Query(() => League, { nullable: true })
    async getLeague(@Arg("id", () => ID) id: number) {
        return await AppDataSource.getRepository(League).findOneBy({ id });
    }

    @Mutation(() => League)
    async createLeague(
        @Arg("name") name: string,
        @Arg("country") country: string,
        @Arg("start_date", () => GraphQLISODateTime) start_date: Date,
        @Arg("end_date", () => GraphQLISODateTime) end_date: Date
    ) {
        const newLeague = AppDataSource.getRepository(League).create({ name, country, start_date, end_date });
        return await AppDataSource.getRepository(League).save(newLeague);
    }

    @Mutation(() => League, { nullable: true })
    async updateLeague(
        @Arg("id", () => ID) id: number,
        @Arg("name") name?: string,
        @Arg("country") country?: string,
        @Arg("start_date", () => GraphQLISODateTime) start_date?: Date,
        @Arg("end_date", () => GraphQLISODateTime) end_date?: Date
    ) {
        const league = await AppDataSource.getRepository(League).findOneBy({ id });
        if (!league) throw new Error("League not found");

        if (name) league.name = name;
        if (country) league.country = country;
        if (start_date) league.start_date = start_date;
        if (end_date) league.end_date = end_date;

        return await AppDataSource.getRepository(League).save(league);
    }

    @Mutation(() => Boolean)
    async deleteLeague(@Arg("id", () => ID) id: number) {
        const result = await AppDataSource.getRepository(League).delete(id);
        return result.affected !== 0;
    }
}
