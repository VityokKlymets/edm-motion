import { existsSync, mkdirSync } from "fs"
import generateHash from "random-hash"
import { join } from "path"
import Jimp from "jimp"
import { getStaticPath } from "utils/files"

// tslint:disable-next-line: interface-name
export interface ImageOptions {
  width: number | string
  height: number | string
}

interface IImageUploaderResult extends IFileUploaderResponse {
  width?: number
  height?: number
}

const FORMAT = ".png"

export default class ImageUploader implements IFileUploader {
  private relativePath: string
  private absolutePath: string

  constructor(relativePath: string, absolutePath: string) {
    if (!existsSync(absolutePath)) {
      mkdirSync(absolutePath, { recursive: true })
    }
    this.absolutePath = absolutePath
    this.relativePath = relativePath
  }

  public async upload(file: string, options?: ImageOptions): Promise<IImageUploaderResult> {
    const hash = generateHash({ length: 16 })
    const result = join(this.relativePath, hash) + FORMAT
    const path = join(this.absolutePath, hash) + FORMAT

    if (!existsSync(file)) {
      return {
        status: "error",
        path: file,
      }
    }

    const image = await Jimp.read(file)

    if (options) {
      const height = parseInt(options.height.toString(), 10)
      const width = parseInt(options.width.toString(), 10)
      image.resize(width, height)
    }

    image.write(path)

    return {
      status: "ok",
      path: getStaticPath(result),
      width: image.bitmap.width,
      height: image.bitmap.height,
    }
  }

  public async load(path: string): Promise<IFileUploaderResponse> {
    return {
      path,
      status: "ok",
    }
  }
}
