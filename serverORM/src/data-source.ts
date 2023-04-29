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
    host: "ppp.mysql.database.azure.com",
    port: parseInt(process.env.DB_PORT),
    username: "PPPAdmin",
    password: "Admin$123",
    database: "ppp",
    ssl : {
        rejectUnauthorized: false
    },
    logging: true,
    entities: [User, Project, Section, Task],
    migrations: [FakeData1680044213857],
    synchronize: true,
})