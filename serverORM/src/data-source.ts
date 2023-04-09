import "reflect-metadata"
import { DataSource } from "typeorm"
import { Project } from "./entity/Project"
import { Section } from "./entity/Section"
import { Task } from "./entity/Task"
import { User } from "./entity/User"
import 'dotenv/config'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Project, Section, Task],
    subscribers: [],
    migrations: [],
})
