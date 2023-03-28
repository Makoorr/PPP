import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Project } from "./Project"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    login: string

    @Column()
    password: string

    @Column()
    name: string

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[]
}