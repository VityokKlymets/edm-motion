import {
  Entity,
  Column,
  ManyToMany,
  BeforeInsert,
  ManyToOne,
  BeforeUpdate,
  JoinColumn,
  OneToOne,
} from "typeorm"
import uniqid from "uniqid"
import { IsNotEmpty } from "class-validator"

import EntityBase from "models/EntityBase"
import Artist from "models/Artist"
import News from "models/News"
import Playlist from "models/Playlist"
import Genre from "models/Genre"
import Image from "models/Image"

const ENTITY_NAME: Entities = "Song"
@Entity({
  name: ENTITY_NAME,
})
class Song extends EntityBase {
  @Column()
  @IsNotEmpty()
  public title: string

  @Column()
  @IsNotEmpty()
  public path: string

  @Column({
    default: false,
  })
  public isTelegramUpload: boolean

  @Column({
    default: false,
  })
  public isPreview: boolean

  @Column({
    default: 0,
  })
  public listensCount: number

  @OneToOne(() => Image, { onDelete: "SET NULL" })
  @JoinColumn()
  public cover: Image

  @Column()
  public duration: number

  @ManyToMany(() => Artist, (artist) => artist.songs)
  public artists: Artist[]

  @ManyToMany(() => News, (news) => news.songs)
  public news: News[]

  @ManyToOne(() => Playlist, (playlist) => playlist.songs)
  public playlist: Playlist

  @ManyToOne(() => Genre, (genre) => genre.songs)
  public genre: Genre

  @Column()
  public url: string

  @Column({ nullable: true })
  public uniqueId: string

  @Column("float", {
    array: true,
  })
  public waveform: number[]

  setString = () => {
    this.string = this.artists
      ? `${this.artists.map((a) => a.name).join(" & ")} - ${this.title}`
      : this.title
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async setUniqueId() {
    this.uniqueId = uniqid()
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async setUrl() {
    this.url = `/song/play?path=${this.path}`
  }
}

export default Song
