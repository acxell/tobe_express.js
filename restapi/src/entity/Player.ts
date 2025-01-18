import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Club } from "./Club";
import { Matches } from "class-validator";
import { MatchEvents } from "./MatchEvents";

@ObjectType()
@Entity()
export class Player extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    position: string;

    @Field()
    @Column()
    nationality: string;

    @Field(() => Club)
    @ManyToOne(() => Club, (club) => club.players, { nullable: false, eager: true })
    club: Club;

    @OneToMany(() => MatchEvents, (match_events) => match_events.player)
    match_events: MatchEvents[];

    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

}
