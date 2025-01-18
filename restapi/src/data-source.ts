import "reflect-metadata"
import { DataSource } from "typeorm"
import { Club } from "./entity/Club"
import { ClubSponsors } from "./entity/ClubSponsors"
import { League } from "./entity/League"
import { Manager } from "./entity/Manager"
import { Matches } from "./entity/Matches"
import { MatchEvents } from "./entity/MatchEvents"
import { MatchReferees } from "./entity/MatchReferees"
import { Player } from "./entity/Player"
import { Referee } from "./entity/Referees"
import { Sponsors } from "./entity/Sponsors"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 3306,
    username: "postgres",
    password: "",
    database: "restapi",
    synchronize: true,
    logging: false,
    entities: [
        Club,
        ClubSponsors,
        League,
        Manager,
        Matches,
        MatchEvents,
        MatchReferees,
        Player,
        Referee,
        Sponsors,
    ],
    migrations: [],
    subscribers: [],
})
