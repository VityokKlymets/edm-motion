import { readFileSync } from "fs"
import { getRootFolderPath } from "utils/files"
import { join } from "path"

export const getCommonConfig = () => {
  return readFileSync(join(getRootFolderPath(), "common.env")).toString()
}

