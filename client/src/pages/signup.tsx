import { NextPage } from "next"
import SignupForm from "components/forms/SignupForm"
import Header from "components/header/Header"

import { USER_SIGNUP } from "config/api"
import { post } from "utils/api"
import { useState } from "react"
import { login } from "utils/auth"

const Page: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onSignupSubmit = async (data: IUserSignupRequest) => {
    setLoading(true)

    const response = await post<IUserSignupResponse>(USER_SIGNUP, data)
    const { status, error: responseError, token } = response

    if (status === "error") {
      setError(responseError.message)
    }

    if (status === "ok") {
      login(token)
    }

    setLoading(false)
  }
  return (
    <div className="page signup_page">
      <Header />
      <SignupForm loading={loading} onSubmit={onSignupSubmit} error={error} />
    </div>
  )
}

export default Page
