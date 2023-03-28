import "reflect-metadata"
import { DataSource } from "typeorm"
import { Project } from "./entity/Project"
import { Section } from "./entity/Section"
import { Task } from "./entity/Task"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "mysqldb",
    port: 3306,
    username: "user",
    password: "passworduser",
    database: "ppp",
    synchronize: true,
    logging: true,
    entities: [User, Project, Section, Task],
    subscribers: [],
    migrations: [],
})
