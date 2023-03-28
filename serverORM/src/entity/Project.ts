import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Section } from "./Section"
import { User } from "./User"

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column({ default: false })
    done: boolean

    @ManyToOne(() => User, (user) => user.projects)
    user: User

    @OneToMany(() => Section, (section) => section.project)
    sections: Section[]
}