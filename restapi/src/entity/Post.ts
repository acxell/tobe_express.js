import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    @CreateDateColumn()
    createAt: Date

    @Column()
    @UpdateDateColumn()
    updateAt: Date

}
