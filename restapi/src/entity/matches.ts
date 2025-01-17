import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Club } from "./Club";

@ObjectType()
@Entity()
export class Matches extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Club)
    @ManyToOne(() => Club, (club) => club.matches, { nullable: false, eager: true })
    home_club: Club;

    @Field(() => Club)
    @ManyToOne(() => Club, (club) => club.matches, { nullable: false, eager: true })
    away_club: Club;

    @Field()
    @Column()
    cup_name: string;

    @Field(() => Int)
    @Column({type: "int"})
    home_score: number;

    @Field(() => Int)
    @Column({type: "int"})
    away_score: number;

    @Field(() => Date)
    @Column()
    match_date: Date;

    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

}
