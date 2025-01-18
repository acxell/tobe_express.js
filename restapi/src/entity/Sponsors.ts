import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, ManyToMany, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { ClubSponsors } from "./ClubSponsors";

@ObjectType()
@Entity()
export class Sponsors extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    industry: string;

    @Field()
    @Column()
    country: string;

    @OneToMany(() => ClubSponsors, (clubSponsors) => clubSponsors.sponsors)
    club_sponsors: ClubSponsors[];

    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

}
