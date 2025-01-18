import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToOne, OneToMany, ManyToMany } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Club } from "./Club";
import { MatchEvents } from "./MatchEvents";
import { Sponsors } from "./Sponsors";

@ObjectType()
@Entity()
export class ClubSponsors extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Club)
    @ManyToOne(() => Club, (club) => club.club_sponsors, { nullable: false, eager: true })
    club: Club;

    @Field(() => Sponsors)
    @ManyToOne(() => Sponsors, (sponsors) => sponsors.club_sponsors, { nullable: false, eager: true })
    sponsors: Sponsors;

    @Field(() => Int)
    @Column({type: "int"})
    contract_value: number;

    @Field(() => Date)
    @Column()
    start_date: Date;

    @Field(() => Date)
    @Column()
    end_date: Date;

    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

}
