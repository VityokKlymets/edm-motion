import { Entity, Column, OneToOne, JoinColumn } from "typeorm"
import { IsUniq } from "@join-com/typeorm-class-validator-is-uniq"
import { IsEmail } from "class-validator"

import Playlist from "models/Playlist"
import Joi from "@hapi/joi"
import EntityBase from "models/EntityBase"

enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  GHOST = "ghost",
}

const ENTITY_NAME: Entities = "User"
@Entity({
  name: ENTITY_NAME,
})
class User extends EntityBase {
  @Column()
  @IsUniq({
    message: "This email already taken",
  })
  @IsEmail()
  public email: string

  @Column()
  public password: string

  @OneToOne((type) => Playlist)
  @JoinColumn()
  public playlist: Playlist

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.GHOST,
  })
  public role: UserRole

  setString = () => {
    this.string = this.email
  }
}

export const UserSchema = Joi.object().keys({
  id: Joi.number().positive().optional(),
  email: Joi.string().alphanum().required(),
  password: Joi.string().alphanum().required(),
})

export default User
