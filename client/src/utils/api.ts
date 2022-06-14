import axios from "axios"
import Cookies from "js-cookie"
import { GetServerSidePropsContext } from "next-redux-wrapper"
import fetch from "isomorphic-unfetch"
import { getToken } from "utils/auth"
import { NextPageContext } from "next"

export const post = async <T>(url: string, body?: any): Promise<T> => {
  const token = Cookies.get("token")

  const response = await axios.post(url, body, {
    headers: { Authorization: `bearer ${token}` },
  })

  const data: T = response.data
  return data
}

export const postForm = async <T>(url: string, formData: FormData): Promise<T> => {
  const token = Cookies.get("token")

  const response = await axios({
    method: "POST",
    url,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `bearer ${token}`,
    },
  })

  const data: T = response.data

  return data
}

export const isomorphicFetch = async <T>(
  url: string,
  body: any = {},
  ctx: GetServerSidePropsContext
): Promise<T> => {
  const baseUrl = getBaseUrl(ctx)

  let response = null
  
  try {
    response = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${getToken(ctx)}`,
      },
      credentials: "include",
    })
  
  } catch (error) {
    console.error(error)
  }

  if (response) {
    const json: T = await response.json()
    return json

  }

  return {} as T
}

export const getApiHost = () => {
  return '/api'
}

export const getAbsolutePath = (path: string) => {
  return `${process.env.NEXT_PUBLIC_CLIENT_HOST}${path}`
}


export const getBaseUrl = ({req}:GetServerSidePropsContext | NextPageContext) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
  return baseUrl
}