import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, ManyToMany, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { MatchReferees } from "./MatchReferees";

@ObjectType()
@Entity()
export class Referee extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => Int)
    @Column({ type: "int" })
    experience_year: number;

    @Field()
    @Column()
    nationality: string;

    @Field()
    @Column()
    role: string;

    @OneToMany(() => MatchReferees, (matchReferees) => matchReferees.referee)
    matchReferees: MatchReferees[];

    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

}
