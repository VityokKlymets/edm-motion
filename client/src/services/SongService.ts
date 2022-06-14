import BaseService from "services/BaseService"
import { SONG_FETCH, SONG_LAST } from "config/api"
import { GetServerSidePropsContext } from "next-redux-wrapper"
import { isomorphicFetch } from "utils/api"

class SongService extends BaseService {
  constructor(ctx?: GetServerSidePropsContext) {
    super(ctx)
  }
  public getOne(id: number | string) {
    const req: ISongFetchRequest = {
      id,
    }
    return isomorphicFetch<ISongFetchResponse>(SONG_FETCH, req, this.ctx)
  }

  public fetchLastSongs() {
    return isomorphicFetch<IEntityListResponse>(SONG_LAST, {}, this.ctx)
  }
}

export default SongService
