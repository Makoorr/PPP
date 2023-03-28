import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column({ default: 0 })
    priority: number

    @Column({ type: "date" })
    deadline: string

    @Column({ default: false })
    done: boolean
}