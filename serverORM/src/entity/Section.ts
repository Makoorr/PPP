import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}