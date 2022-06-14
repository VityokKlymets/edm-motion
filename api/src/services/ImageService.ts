import { ImageOptions } from "classes/ImageUploader"
import EntityServiceBase from "services/EntityServiceBase"
import Image from "models/Image"
import { File } from "formidable"
import { uploadImage } from "utils/files"

class ImageService extends EntityServiceBase {
  private folder: string
  constructor(folder: string) {
    super()
    this.folder = folder
  }

  public async upload(file: File, options?: ImageOptions) {
    if (!file) return null

    const { width, height, path } = await uploadImage(file, this.folder, options)

    const image = new Image()
    image.width = width
    image.height = height
    image.path = path

    return this.add(Image, image)
  }

  public async reupload(oldImage: Image, newImage: File | Image, options?: ImageOptions) {
    if (!newImage) return null

    if (this.isFile(newImage)) {
      if (oldImage) {
        await this.delete(oldImage)
      }
      return this.upload(newImage, options)
    } else {
      return newImage
    }
  }

  private isFile(newImage: File | Image) {
    return typeof newImage.type !== "undefined"
  }
}

export default ImageService
