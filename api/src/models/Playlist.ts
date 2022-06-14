import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import Song from "models/Song"
import Joi from "@hapi/joi"

const ENTITY_NAME: Entities = "Artist"
@Entity({
  name: ENTITY_NAME,
})
class Playlist {
  @PrimaryGeneratedColumn()
  public id?: number

  @OneToMany((type) => Song, (song) => song.playlist)
  public songs: Song[]
}

export const PlaylistSchema = Joi.object().keys({
  id: Joi.number().positive().optional(),
  songs: Joi.array().items(Joi.number()),
})

export default Playlist
