import { Resolver, Query, Mutation, Arg, ID, GraphQLISODateTime, Int } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Referee } from "../entity/Referees";

@Resolver(() => Referee)
export class RefereeResolver {
    @Query(() => [Referee])
    async getReferees() {
        return await AppDataSource.getRepository(Referee).find();
    }

    @Query(() => Referee, { nullable: true })
    async getReferee(@Arg("id", () => ID) id: number) {
        return await AppDataSource.getRepository(Referee).findOneBy({ id });
    }

    @Mutation(() => Referee)
    async createReferee(
        @Arg("name") name: string,
        @Arg("role") role: string,
        @Arg("experience_year", () => Int) experience_year: number,
        @Arg("nationality") nationality: string,
    ) {
        const newReferee = AppDataSource.getRepository(Referee).create({ name, experience_year, nationality, role });
        return await AppDataSource.getRepository(Referee).save(newReferee);
    }

    @Mutation(() => Referee, { nullable: true })
    async updateReferee(
        @Arg("id", () => ID) id: number,
        @Arg("name", { nullable: true }) name?: string,
        @Arg("role", { nullable: true }) role?: string,
        @Arg("experience_year", () => Int, { nullable: true }) experience_year?: number,
        @Arg("nationality", { nullable: true }) nationality?: string,
    ) {
        const referee = await AppDataSource.getRepository(Referee).findOneBy({ id });
        if (!referee) throw new Error("Referee not found");

        if (name) referee.name = name;
        if (role) referee.role = role;
        if (experience_year) referee.experience_year = experience_year;
        if (nationality) referee.nationality = nationality;

        return await AppDataSource.getRepository(Referee).save(referee);
    }

    @Mutation(() => Boolean)
    async deleteReferee(@Arg("id", () => ID) id: number) {
        const result = await AppDataSource.getRepository(Referee).delete(id);
        return result.affected !== 0;
    }
}
