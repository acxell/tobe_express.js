import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToOne, OneToMany, ManyToMany, JoinColumn } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Club } from "./Club";
import { Matches } from "./Matches";
import { Referee } from "./Referees";

@ObjectType()
@Entity()
export class MatchReferees extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Matches)
    @ManyToOne(() => Matches, (matches) => matches.match_referees, { nullable: false, eager: true })
    matches: Matches;

    @Field(() => Referee)
    @ManyToOne(() => Referee, (referee) => referee.matchReferees, { nullable: false, eager: true })
    referee: Referee;

    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

}
