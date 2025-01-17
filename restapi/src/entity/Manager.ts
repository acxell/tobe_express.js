import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Club } from "./Club";

@ObjectType()
@Entity()
export class Manager extends BaseEntity {

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

    @Field(() => Club)
    @OneToOne(() => Club, (club) => club.manager, { nullable: false, eager: true })
    @JoinColumn()
    club: Club;

    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

}
