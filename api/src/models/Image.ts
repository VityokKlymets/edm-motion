import { BeforeRemove, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { deleteImage } from "utils/files"

const ENTITY_NAME: Entities = "Image"

@Entity({
  name: ENTITY_NAME,
})
class Image {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  public path: string

  @Column()
  public width: number

  @Column()
  public height: number

  @BeforeRemove()
  private async clean() {
    deleteImage(this.path)
  }
}

export default Image
