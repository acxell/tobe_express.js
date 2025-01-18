import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Matches } from "./Matches";
import { Player } from "./Player";

@ObjectType()
@Entity()
export class MatchEvents extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Matches)
    @ManyToOne(() => Matches, (matches) => matches.match_events, { nullable: false, eager: true })
    matches: Matches;

    @Field()
    @Column()
    event_type: string;

    @Field(() => Player)
    @ManyToOne(() => Player, (player) => player.match_events, { nullable: true, eager: true })
    player: Player;

    @Field(() => Int)
    @Column({ type: "int" })
    minute: number;

    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

}
