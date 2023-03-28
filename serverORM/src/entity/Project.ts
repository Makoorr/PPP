import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}