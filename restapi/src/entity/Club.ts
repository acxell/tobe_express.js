import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { League } from "./League";
import { Player } from "./Player";
import { Manager } from "./Manager";
import { Matches } from "./Matches";

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

    @OneToOne(() => Manager, (manager) => manager.club, {nullable: true})
    manager: Manager;

    @OneToMany(() => Matches, (matches) => matches.home_club)
    @OneToMany(() => Matches, (matches) => matches.away_club)
    matches: Matches[];

    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

}
