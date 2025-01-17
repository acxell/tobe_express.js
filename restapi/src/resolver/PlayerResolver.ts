import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Player } from "../entity/Player";
import { Club } from "../entity/Club";

@Resolver(() => Player)
export class PlayerResolver {
    @Query(() => [Player])
    async getPlayers() {
        return await AppDataSource.getRepository(Player).find();
    }

    @Query(() => Player, { nullable: true })
    async getPlayer(@Arg("id", () => ID) id: number) {
        return await AppDataSource.getRepository(Player).findOneBy({ id });
    }

    @Mutation(() => Player)
    async createPlayer(
        @Arg("name") name: string,
        @Arg("position") position: string,
        @Arg("nationality") nationality: string,
        @Arg("clubId", () => ID) clubId: number
    ) {
        const club = await AppDataSource.getRepository(Club).findOneBy({ id: clubId });
        if (!club) throw new Error("Club not found");

        const newPlayer = AppDataSource.getRepository(Player).create({ name, position, nationality, club });
        return await AppDataSource.getRepository(Player).save(newPlayer);
    }

    @Mutation(() => Player, { nullable: true })
    async updatePlayer(
        @Arg("id", () => ID) id: number,
        @Arg("name", { nullable: true }) name?: string,
        @Arg("postion", { nullable: true }) position?: string,
        @Arg("nationality", { nullable: true }) nationality?: string,
        @Arg("clubId", () => ID, { nullable: true }) clubId?: number
    ) {
        const player = await AppDataSource.getRepository(Player).findOneBy({ id });
        if (!player) throw new Error("Player not found");

        if (name) player.name = name;
        if (position) player.position = position;
        if (nationality) player.nationality = nationality;

        if (clubId) {
            const club = await AppDataSource.getRepository(Club).findOneBy({ id: clubId });
            if (!club) throw new Error("League not found");
            player.club = club;
        }

        return await AppDataSource.getRepository(Player).save(player);
    }

    @Mutation(() => Boolean)
    async deletePlayer(@Arg("id", () => ID) id: number) {
        const result = await AppDataSource.getRepository(Player).delete(id);
        return result.affected !== 0;
    }
}
