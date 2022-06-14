import { GetServerSidePropsContext } from "next-redux-wrapper"

class BaseService {
  protected ctx?: GetServerSidePropsContext
  constructor(ctx: GetServerSidePropsContext = null) {
    this.ctx = ctx
  }
}

export default BaseService
