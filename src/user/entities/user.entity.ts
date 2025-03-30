import { Task } from 'src/task/entities/task.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 15 })
  username: string

  @Column({ type: 'varchar', length: 40, unique: true })
  email: string

  @Column({ type: 'varchar' })
  password: string

  @ManyToOne(() => Task, (task) => task.owner)
  tasks: Task[]
}
