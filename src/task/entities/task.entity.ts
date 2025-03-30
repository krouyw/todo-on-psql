import { Priority, Status } from 'src/enum/task.enum'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  title: string

  @Column({ enum: Status, default: Status.ToDo })
  status: Status

  @Column({ enum: Priority, default: Priority.Low })
  priority: Priority

  @Column({ type: 'date' })
  deadline: Date

  @OneToMany(() => User, (user) => user.tasks)
  owner: User

  @Column({ default: false })
  isEdited: boolean
}
