import MyAudio from "components/player/MyAudio"

export const DEFAULT_PAGE_DESCRIPTION =
  "Edm-motion gives you the breaking news  and fresh releases of edm music today"

export const getSongDescription = (song: ISongEntity) => {
  return `
    Download or listen ${song.title} for free by ${song.artists.map((a) => a.name).join(", ")}
    ${song.genre ? `Genre: ${song.genre.name}` : ""} Duration: ${MyAudio.timeToString(
    song.duration
  )}

    `
}
