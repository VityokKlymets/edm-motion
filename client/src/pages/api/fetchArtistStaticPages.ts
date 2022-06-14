import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"
import path from "path"

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { query = "" } = req.body

  const dirRelativeToPagesFolder = "artists"

  const dir =
    process.env.NODE_ENV === "development"
      ? path.resolve("./src/pages", dirRelativeToPagesFolder)
      : path.resolve("./pages")

  let response: ISearchResult[] = []

  try {
    const files = fs.readdirSync(dir).map((file) => file.replace(/\.[^/.]+$/, ""))
    const filtered = files.filter((file) => file.toLowerCase().indexOf(query.toLowerCase()) > -1)
    response = filtered.map((title) => ({ title }))
  } catch (error) {
    response = []
  }
  res.json(response)
}
