import { Resolver, Query, Mutation, Arg, ID, Int } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Club } from "../entity/Club";
import { Manager } from "../entity/Manager";

@Resolver(() => Manager)
export class ManagerResolver {
    @Query(() => [Manager])
    async getManagers() {
        return await AppDataSource.getRepository(Manager).find();
    }

    @Query(() => Manager, { nullable: true })
    async getManager(@Arg("id", () => ID) id: number) {
        return await AppDataSource.getRepository(Manager).findOneBy({ id });
    }

    @Mutation(() => Manager)
    async createManager(
        @Arg("name") name: string,
        @Arg("experience_year", () => Int) experience_year: number,
        @Arg("nationality") nationality: string,
        @Arg("clubId", () => ID) clubId: number
    ) {
        const club = await AppDataSource.getRepository(Club).findOneBy({ id: clubId });
        if (!club) throw new Error("Club not found");

        const newManager = AppDataSource.getRepository(Manager).create({ name, experience_year, nationality, club });
        return await AppDataSource.getRepository(Manager).save(newManager);
    }

    @Mutation(() => Manager, { nullable: true })
    async updateManager(
        @Arg("id", () => ID) id: number,
        @Arg("name", { nullable: true }) name?: string,
        @Arg("experience_year", () => Int, { nullable: true }) experience_year?: number,
        @Arg("nationality", { nullable: true }) nationality?: string,
        @Arg("clubId", () => ID, { nullable: true }) clubId?: number
    ) {
        const manager = await AppDataSource.getRepository(Manager).findOneBy({ id });
        if (!manager) throw new Error("Manager not found");

        if (name) manager.name = name;
        if (experience_year) manager.experience_year = experience_year;
        if (nationality) manager.nationality = nationality;

        if (clubId) {
            const club = await AppDataSource.getRepository(Club).findOneBy({ id: clubId });
            if (!club) throw new Error("League not found");
            manager.club = club;
        }

        return await AppDataSource.getRepository(Manager).save(manager);
    }

    @Mutation(() => Boolean)
    async deleteManager(@Arg("id", () => ID) id: number) {
        const result = await AppDataSource.getRepository(Manager).delete(id);
        return result.affected !== 0;
    }
}
