import { Entity, Column, ManyToMany, OneToMany, BeforeUpdate, BeforeInsert } from "typeorm"
import { IsUniq } from "@join-com/typeorm-class-validator-is-uniq"
import News from "models/News"
import Joi from "@hapi/joi"
import EntityBase from "models/EntityBase"
import Song from "models/Song"
import { clear } from "utils/string"

const ENTITY_NAME: Entities = "Genre"
@Entity({
  name: ENTITY_NAME,
})
class Genre extends EntityBase {
  @IsUniq()
  @Column({
    length: 50,
  })
  public name: string

  @ManyToMany((type) => News, (news) => news.genres)
  public news?: News[]

  @OneToMany((type) => Song, (song) => song.genre)
  public songs: Song[]

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

export const GenreSchema = Joi.object().keys({
  id: Joi.number().positive().optional(),
  name: Joi.string().alphanum().min(3).max(20).required(),
})

export default Genre
