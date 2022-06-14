import { Entity, Column, ManyToMany, BeforeUpdate, BeforeInsert } from "typeorm"
import { IsUniq } from "@join-com/typeorm-class-validator-is-uniq"
import News from "models/News"
import EntityBase from "models/EntityBase"
import { clear } from "utils/string"

const ENTITY_NAME: Entities = "Label"
@Entity({
  name: ENTITY_NAME,
})
class Label extends EntityBase {
  @IsUniq()
  @Column({
    length: 50,
  })
  public name: string

  @ManyToMany((type) => News, (news) => news.labels)
  public news?: News[]

  @BeforeUpdate()
  @BeforeInsert()
  setString = () => {
    this.string = clear(this.name)
  }

  @BeforeUpdate()
  @BeforeInsert()
  setName = () => {
    this.name = clear(this.name)
  }
}

export default Label
