import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Club } from "./Club";
import { Matches } from "./Matches";

@ObjectType()
@Entity()
export class League extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    country: string;

    @Field(() => Date)
    @Column()
    start_date: Date;

    @Field(() => Date)
    @Column()
    end_date: Date;

    @OneToMany(() => Club, (club) => club.league)
    clubs: Club[];

    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

}
