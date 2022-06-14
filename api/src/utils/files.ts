import { unlinkSync, existsSync, mkdirSync, writeFileSync } from "fs"
import { File } from "formidable"
import { join, resolve } from "path"
import ffmetadata from "ffmetadata"

import TelegramUploader from "classes/TelegramUploader"
import ImageUploader, { ImageOptions } from "classes/ImageUploader"

export const getStaticPath = (relativePath: string) => {
  const { STATIC_FOLDER_NAME, SERVER_HOST = "" } = process.env
  return `${SERVER_HOST}${relativePath}`.replace(STATIC_FOLDER_NAME, "")
}

const getRelativePath = (staticPath: string) => {
  const { STATIC_FOLDER_NAME, SERVER_HOST = "" } = process.env
  return join(STATIC_FOLDER_NAME, staticPath.replace(`${SERVER_HOST}`, ""))
}

const getAbsolutePath = (relativePath: string) => {
  const root = getRootFolderPath()
  return join(root, relativePath)
}

export const uploadFile = async (file: File) => {
  const uploader: IFileUploader = new TelegramUploader()
  return uploader.upload(file.path)
}

export const uploadImage = async (file: File, folder: string, options?: ImageOptions) => {
  const relativePath = getStaticFolderRelativePath(folder)
  const absolutePath = getAbsolutePath(relativePath)

  const uploader = new ImageUploader(relativePath, absolutePath)

  return uploader.upload(file.path, options)
}

export const getStaticFolderRelativePath = (folder: string) =>
  join(process.env.STATIC_FOLDER_NAME, folder)

export const getStaticFolderAbsolutePath = (folder: string) => {
  const relativePath = getStaticFolderRelativePath(folder)
  return getAbsolutePath(relativePath)
}

export const reuploadImage = async (
  oldStaticPath: string,
  file: string,
  folder: string,
  options?: ImageOptions
) => {
  deleteImage(oldStaticPath)
  return uploadImage(file, folder, options)
}

export const readMetadata = async (file: File): Promise<IMetadata> => {
  return new Promise((resolve) => {
    console.log(file.path)
    ffmetadata.read(file.path, (err, data) => {
      if (err) resolve({})
      return resolve(data)
    })
  })
}

export const setMetadata = async (
  path: string,
  metadata: IMetadata,
  options: IMetadataOptions
): Promise<void> => {
  return new Promise((resolve) => {
    ffmetadata.write(path, metadata, options, () => {
      resolve()
    })
  })
}

export const deleteImage = async (staticPath: string) => {
  if (!staticPath) return
  const relativePath = getRelativePath(staticPath)
  const absolutePath = getAbsolutePath(relativePath)

  if (existsSync(absolutePath)) {
    return unlinkSync(absolutePath)
  }
}

export const getRootFolderPath = () => {
  return process.cwd()
}

export const getClientRootFolderPath = () => {
  return join(resolve("..", "client"))
}

export const writeSync = (folder: string, filename: string, data: any, encoding) => {
  const path = getStaticFolderAbsolutePath(folder)
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true })
  }
  writeFileSync(join(path, filename), data, encoding)
}
