import { BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn } from "typeorm"

abstract class EntityBase {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  string: string

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  public createdAt: Date

  @BeforeInsert()
  @BeforeUpdate()
  abstract setString: () => void
}
export default EntityBase
