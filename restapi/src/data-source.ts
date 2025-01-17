import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./entity/Post"
import { Club } from "./entity/Club"
import { League } from "./entity/League"
import { Matches } from "./entity/Matches"
import { Manager } from "./entity/Manager"
import { Player } from "./entity/Player"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 3306,
    username: "postgres",
    password: "",
    database: "restapi",
    synchronize: true,
    logging: false,
    entities: [Post, Club, League, Matches, Manager, Player, Matches],
    migrations: [],
    subscribers: [],
})
