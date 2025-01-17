import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { League } from "./League";
import { Player } from "./Player";

@ObjectType()
@Entity()
export class Club extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    stadium_name: string;

    @Field(() => League)
    @ManyToOne(() => League, (league) => league.clubs, { nullable: false, eager: true })
    league: League;

    @OneToMany(() => Player, (player) => player.club)
    players: Player[];

    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

}
