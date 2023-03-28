import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Project } from "./Project"
import { Task } from "./Task"

@Entity()
export class Section {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column({ default: false })
    done: boolean

    @ManyToOne(() => Project, (project) => project.sections)
    project: Project

    @OneToMany(() => Task, (task) => task.section)
    tasks: Task[]
}