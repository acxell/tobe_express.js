import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./entity/Post"
import { Club } from "./entity/Club"
import { League } from "./entity/League"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 3306,
    username: "postgres",
    password: "",
    database: "restapi",
    synchronize: true,
    logging: false,
    entities: [Post, Club, League],
    migrations: [],
    subscribers: [],
})
