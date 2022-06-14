import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm"
import { IsUniq } from "@join-com/typeorm-class-validator-is-uniq"
import EntityBase from "models/EntityBase"
import Song from "models/Song"
import Image from "models/Image"
import { MaxLength, MinLength } from "class-validator"
import { clear } from "utils/string"

const ENTITY_NAME: Entities = "Artist"
@Entity({
  name: ENTITY_NAME,
})
class Artist extends EntityBase {
  @IsUniq()
  @Column()
  @MinLength(3, {
    message: "is too short",
  })
  @MaxLength(40, {
    message: "is too long",
  })
  public name: string

  @Column({ nullable: true })
  public textShort: string

  @ManyToMany(() => Song, (song) => song.artists)
  @JoinTable()
  public songs?: Song[]

  @OneToOne(() => Image, { onDelete: "SET NULL" })
  @JoinColumn()
  public picture: Image

  @Column({
    nullable: true,
  })
  public staticPage: string

  @Column({
    default: 0,
  })
  public views: number

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

export default Artist
