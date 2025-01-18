import { Resolver, Query, Mutation, Arg, ID, GraphQLISODateTime, Int } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Sponsors } from "../entity/Sponsors";

@Resolver(() => Sponsors)
export class SponsorsResolver {
    @Query(() => [Sponsors])
    async getSponsorss() {
        return await AppDataSource.getRepository(Sponsors).find();
    }

    @Query(() => Sponsors, { nullable: true })
    async getSponsors(@Arg("id", () => ID) id: number) {
        return await AppDataSource.getRepository(Sponsors).findOneBy({ id });
    }

    @Mutation(() => Sponsors)
    async createSponsors(
        @Arg("name") name: string,
        @Arg("industry") industry: string,
        @Arg("country") country: string,
    ) {
        const newSponsors = AppDataSource.getRepository(Sponsors).create({ name, industry, country });
        return await AppDataSource.getRepository(Sponsors).save(newSponsors);
    }

    @Mutation(() => Sponsors, { nullable: true })
    async updateSponsors(
        @Arg("id", () => ID) id: number,
        @Arg("name", { nullable: true }) name?: string,
        @Arg("industry", { nullable: true }) industry?: string,
        @Arg("country", { nullable: true }) country?: string,
    ) {
        const sponsors = await AppDataSource.getRepository(Sponsors).findOneBy({ id });
        if (!sponsors) throw new Error("Sponsors not found");

        if (name) sponsors.name = name;
        if (industry) sponsors.industry = industry;
        if (country) sponsors.country = country;

        return await AppDataSource.getRepository(Sponsors).save(sponsors);
    }

    @Mutation(() => Boolean)
    async deleteSponsors(@Arg("id", () => ID) id: number) {
        const result = await AppDataSource.getRepository(Sponsors).delete(id);
        return result.affected !== 0;
    }
}
