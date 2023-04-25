import "reflect-metadata"
import { DataSource } from "typeorm"
import { Project } from "./entity/Project"
import { Section } from "./entity/Section"
import { Task } from "./entity/Task"
import { User } from "./entity/User"
import 'dotenv/config'
import { FakeData1680044213857 } from "./migrations/1680044213857-FakeData"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl : {
        rejectUnauthorized: false
    },
    logging: true,
    entities: [User, Project, Section, Task],
    migrations: [FakeData1680044213857],
    synchronize: true,
})