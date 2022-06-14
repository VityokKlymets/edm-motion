import { NextPage } from "next"
import LoginForm from "components/forms/LoginForm"
import Header from "components/header/Header"
import { post } from "utils/api"
import { USER_LOGIN } from "config/api"
import { useState } from "react"
import { login } from "utils/auth"

const Page: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const onLoginSubmit = async (data: IUserLoginRequest) => {
    setLoading(true)

    const response = await post<IUserLoginResponse>(USER_LOGIN, data)
    const { status, error, token } = response

    if (status === "error") {
      setErrorMessage(error.message)
    }

    if (status === "ok") {
      login(token)
    }

    setLoading(false)
  }

  return (
    <div className="page login_page">
      <Header />
      <LoginForm error={errorMessage} loading={loading} onSubmit={onLoginSubmit} />
    </div>
  )
}
export default Page
