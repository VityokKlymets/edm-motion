import Song from "models/Song"
import { join } from "path"
import { readdirSync, createReadStream, createWriteStream } from "fs"
import prettier from "prettier"
import globby from "globby"
import zlib from "zlib"
import EntityService from "services/EntityService"
import {
  getClientRootFolderPath,
  getRootFolderPath,
  getStaticFolderAbsolutePath,
  getStaticFolderRelativePath,
  writeSync,
} from "utils/files"
import NewsService from "services/NewsService"
import GenreService from "services/GenreService"
import LabelService from "services/LabelService"

const currentDate = new Date().toISOString()
const SITEMAP_ACTIVE = false

const formatted = (sitemap: string) => prettier.format(sitemap, { parser: "html" })

const getRecord = (loc: string) => {
  const { SERVER_HOST } = process.env
  return `<url><loc>${`${SERVER_HOST}${loc}`}</loc> <lastmod>${currentDate}</lastmod></url>\n`
}

const getSitemapRecord = (loc: string) => {
  const { SERVER_HOST } = process.env
  return `<sitemap><loc>${`${SERVER_HOST}${loc}`}</loc><lastmod>${currentDate}</lastmod></sitemap>`
}

const getSitemap = (list: string) => {
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
    ${list}
    </urlset>
`
  return [formatted(sitemap)]
}

const getSitemapIndex = (list: string) => {
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${list}
    </sitemapindex>
  `
  return [formatted(sitemap)]
}

const writeSitemap = (filename: string, sitemap: any) => {
  const { SITEMAP_FOLDER } = process.env
  writeSync(SITEMAP_FOLDER, filename, sitemap, "utf8")
}

const generateSongSitemap = async () => {
  const songs = await new EntityService().find(Song)

  const songListSitemap = `${songs.map(({ id }) => getRecord(`/songs/${id}`)).join("")}`

  const sitemap = getSitemap(songListSitemap)
  writeSitemap("sitemap-songs.xml", sitemap)
}

const sitemapFromRoutes = (routes: string[]) => {
  const sitemap = `${routes.map((route) => getRecord(route)).join("")}`
  return getSitemap(sitemap)
}

const generatePagesSitemap = async () => {
  const clientPages = join(getClientRootFolderPath(), "src", "pages")
  const pages = await globby([
    `${clientPages}/**/*.tsx`,
    `${clientPages}/*.tsx`,
    `!${clientPages}/_*.tsx`,
    `!${clientPages}/admin/*.tsx`,
    `!${clientPages}/**/[id].tsx`,
    `!${clientPages}/**/[page].tsx`,
  ])

  const routes = pages.map((page) => {
    const path = page
      .replace(clientPages, "")
      .replace(".tsx", "")
      .replace(/\/index/g, "")
    const routePath = path === "index" ? "" : path

    return routePath
  })

  const sitemap = sitemapFromRoutes(routes)
  writeSitemap("sitemap-pages.xml", sitemap)
}

const generateNewsSitemap = async () => {
  const { totalCount, itemsPerPage } = await new NewsService().listNewsClient({
    pagination: { currentPage: 1 },
  })

  const pagesCount = Math.ceil(totalCount / itemsPerPage)

  const routes = []
  for (let page = 1; page <= pagesCount; page++) {
    routes.push(`/page/${page}`)
  }

  const sitemap = sitemapFromRoutes(routes)
  writeSitemap("sitemap-news.xml", sitemap)
}

const generateGenreSitemap = async () => {
  const genres = await new GenreService().getAll()

  const promises = genres.map(async ({ name }) => {
    const result = []
    const { totalCount, itemsPerPage } = await new NewsService().listNewsClient({
      pagination: { currentPage: 1, genre: name },
    })

    const pagesCount = Math.ceil(totalCount / itemsPerPage)
    if (totalCount > 0) {
      for (let page = 1; page <= pagesCount; page++) {
        result.push(`/genre/${name}/${page}`)
      }
    }
    return result
  })

  const routes = (await Promise.all(promises)).flat()

  const sitemap = sitemapFromRoutes(routes)
  writeSitemap("sitemap-genre.xml", sitemap)
}

const generateLabelSitemap = async () => {
  const labels = await new LabelService().getAll()

  const promises = labels.map(async ({ name }) => {
    const result = []
    const { totalCount, itemsPerPage } = await new NewsService().listNewsClient({
      pagination: { currentPage: 1, label: name },
    })

    const pagesCount = Math.ceil(totalCount / itemsPerPage)
    if (totalCount > 0) {
      for (let page = 1; page <= pagesCount; page++) {
        result.push(`/label/${name}/${page}`)
      }
    }
    return result
  })

  const routes = (await Promise.all(promises)).flat()

  const sitemap = sitemapFromRoutes(routes)
  writeSitemap("sitemap-label.xml", sitemap)
}

export const generateSitemap = async () => {
  if(!SITEMAP_ACTIVE) return
  await generateSongSitemap()
  await generatePagesSitemap()
  await generateNewsSitemap()
  await generateGenreSitemap()
  await generateLabelSitemap()
  gzipSitemaps()
  await generateSitemapIndex()
}

const gzipSitemaps = () => {
  const { SITEMAP_FOLDER } = process.env
  const dir = join(getStaticFolderAbsolutePath(SITEMAP_FOLDER))

  readdirSync(dir).forEach((file) => {
    if (file.endsWith(".xml")) {
      const fileContents = createReadStream(dir + "/" + file)
      const writeStream = createWriteStream(dir + "/" + file + ".gz")
      const zip = zlib.createGzip()

      fileContents
        .pipe(zip)
        .on("error", (err) => console.error(err))
        .pipe(writeStream)
        .on("error", (err) => console.error(err))
    }
  })
}

export const generateSitemapIndex = async () => {
  const { SITEMAP_FOLDER, STATIC_FOLDER_NAME } = process.env

  const dir = join(getStaticFolderAbsolutePath(SITEMAP_FOLDER))
  const root = join(getRootFolderPath(), STATIC_FOLDER_NAME)

  const pages = await globby([`${dir}/*.gz`])

  const routes = pages.map((page) => page.replace(root, ""))

  const list = `${routes.map((page) => getSitemapRecord(page)).join("")} `

  const sitemap = getSitemapIndex(list)

  writeSitemap("sitemap.xml", sitemap)
}

type SitemapName = "genre" | "news" | "page" | "song" | "label"

export const generateSpecificSiteMap = async (names: SitemapName[]) => {
  if(!SITEMAP_ACTIVE) return;
  const promises = names.map(async (name) => {
    switch (name) {
      case "song":
        await generateSongSitemap()
        break
      case "genre":
        await generateGenreSitemap()
        break
      case "news":
        await generateNewsSitemap()
        break
      case "page":
        await generatePagesSitemap()
        break
      case "label":
        await generateLabelSitemap()
        break
    }
  })
  await Promise.all(promises)
  gzipSitemaps()
  await generateSitemapIndex()
}
