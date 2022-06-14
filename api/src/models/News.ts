import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  AfterLoad,
  OneToOne,
  JoinColumn,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm"
import { IsNotEmpty } from "class-validator"
import moment from "moment"

import EntityBase from "models/EntityBase"
import Song from "models/Song"
import Genre from "models/Genre"
import Label from "models/Label"
import Image from "models/Image"
import { clear } from "utils/string"

const ENTITY_NAME: Entities = "News"
@Entity({
  name: ENTITY_NAME,
})
class News extends EntityBase {
  @Column()
  @IsNotEmpty()
  public title: string

  @Column({
    nullable: true,
  })
  public description?: string

  @Column({
    nullable: true,
  })
  public releaseDate: Date

  @Column({
    default: false,
  })
  public isAttached: boolean

  @Column({
    default: false,
  })
  public published: boolean

  @OneToOne(() => Image, { onDelete: "SET NULL" })
  @JoinColumn()
  public picture: Image

  @ManyToMany((type) => Song, (song) => song.news)
  @JoinTable()
  public songs: Song[]

  @ManyToMany((type) => Genre, (genre) => genre.news)
  @JoinTable()
  public genres: Genre[]

  @ManyToMany((type) => Label, (label) => label.news)
  @JoinTable()
  public labels: Label[]

  @Column({
    nullable: true,
  })
  public elapsedTime?: string

  @BeforeUpdate()
  @BeforeInsert()
  setString = () => {
    this.string = this.title
  }

  @BeforeUpdate()
  @BeforeInsert()
  setTitle = () => {
    this.string = clear(this.title)
  }

  @AfterLoad()
  private setElapsedTime() {
    this.elapsedTime = moment(this.createdAt).fromNow()
  }
}

export default News
