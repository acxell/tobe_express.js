import { Resolver, Query, Mutation, Arg, ID, GraphQLISODateTime, Int } from "type-graphql";
import { AppDataSource } from "../data-source";
import { ClubSponsors } from "../entity/ClubSponsors";
import { Club } from "../entity/Club";
import { Sponsors } from "../entity/Sponsors";

@Resolver(() => ClubSponsors)
export class ClubSponsorResolver {
    @Query(() => [ClubSponsors])
    async getClubSponsors() {
        return await AppDataSource.getRepository(ClubSponsors).find();
    }

    @Query(() => ClubSponsors, { nullable: true })
    async getClubSponsor(@Arg("id", () => ID) id: number) {
        return await AppDataSource.getRepository(ClubSponsors).findOneBy({ id });
    }

    @Mutation(() => ClubSponsors)
    async createClubSponsor(
        @Arg("clubId", () => ID) clubId: number,
        @Arg("sponsorId", () => ID) sponsorId: number,
        @Arg("contract_value", () => Int) contract_value: number,
        @Arg("start_date", () => GraphQLISODateTime) start_date: Date,
        @Arg("end_date", () => GraphQLISODateTime) end_date: Date
    ) {
        const club = await AppDataSource.getRepository(Club).findOneBy({ id: clubId });
        if (!club) throw new Error("Club not found");

        const sponsors = await AppDataSource.getRepository(Sponsors).findOneBy({ id: sponsorId });
        if (!sponsors) throw new Error("Sponsor not found");

        const newClubSponsor = AppDataSource.getRepository(ClubSponsors).create({ club, sponsors, contract_value, start_date, end_date });
        return await AppDataSource.getRepository(ClubSponsors).save(newClubSponsor);
    }

    @Mutation(() => ClubSponsors, { nullable: true })
    async updateClubSponsor(
        @Arg("id", () => ID) id: number,
        @Arg("clubId", () => ID, { nullable: true }) clubId?: number,
        @Arg("sponsorId", () => ID, { nullable: true }) sponsorId?: number,
        @Arg("contract_value", () => Int, { nullable: true }) contract_value?: number,
        @Arg("start_date", () => GraphQLISODateTime, { nullable: true }) start_date?: Date,
        @Arg("end_date", () => GraphQLISODateTime, { nullable: true }) end_date?: Date
    ) {
        const clubSponsor = await AppDataSource.getRepository(ClubSponsors).findOneBy({ id });
        if (!clubSponsor) throw new Error("ClubSponsor not found");

        if (clubId) {
            const club = await AppDataSource.getRepository(Club).findOneBy({ id: clubId });
            if (!club) throw new Error("Club not found");
            clubSponsor.club = club;
        }

        if (sponsorId) {
            const sponsor = await AppDataSource.getRepository(Sponsors).findOneBy({ id: sponsorId });
            if (!sponsor) throw new Error("Sponsor not found");
            clubSponsor.sponsors = sponsor;
        }

        if (contract_value !== undefined) clubSponsor.contract_value = contract_value;
        if (start_date) clubSponsor.start_date = start_date;
        if (end_date) clubSponsor.end_date = end_date;

        return await AppDataSource.getRepository(ClubSponsors).save(clubSponsor);
    }

    @Mutation(() => Boolean)
    async deleteClubSponsor(@Arg("id", () => ID) id: number) {
        const result = await AppDataSource.getRepository(ClubSponsors).delete(id);
        return result.affected !== 0;
    }
}
