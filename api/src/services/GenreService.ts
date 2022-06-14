import Genre from "models/Genre"
import EntityServiceBase from "services/EntityServiceBase"
import { titleCase } from "utils/string"

class GenreService extends EntityServiceBase {
  public async addGenre(data: IGenreAddRequest) {
    const { name } = data
    const entity = { name: titleCase(name) }
    return this.add(Genre, entity)
  }

  public async updateGenre(data: IGenreUpdateRequest) {
    const { name, id } = data
    const genre = await this.findById(Genre, id)
    genre.name = titleCase(name)
    return [this.update(Genre, genre)]
  }

  public async getAll() {
    return this.find(Genre)
  }
}
export default GenreService
