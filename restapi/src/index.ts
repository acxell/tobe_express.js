import { AppDataSource } from "./data-source"
import { Post } from "./entity/Post"
import * as express from "express";
import * as BodyParser from "body-parser";
import * as cors from "cors";
import postRoutes from './routes/postRoutes';

AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

    const app = express();
    app.use(cors());
    app.use(BodyParser.json());

    app.use('/', postRoutes);

    app.listen(8080, () => console.log(`App is running at port 8080`));

}).catch(error => console.log(error))
