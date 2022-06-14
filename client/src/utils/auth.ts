import { GetServerSidePropsContext } from "next-redux-wrapper"
import Router from "next/router"
import nextCookie from "next-cookies"
import cookie from "js-cookie"

export const login = (token, redirectTo = "/") => {
  cookie.set("token", token, { expires: 1 })
  Router.push(redirectTo)
}

export const auth = (ctx) => {
  const { token } = nextCookie(ctx)
  if (!token) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { Location: "/login" })
      ctx.res.end()
    } else {
      Router.push("/login")
    }
  }

  return token
}

export const getToken = (ctx: GetServerSidePropsContext) => {
  const { token } = nextCookie(ctx)
  return token
}

export const logout = () => {
  cookie.remove("token")
  window.localStorage.setItem("logout", Date.now().toString())
}
