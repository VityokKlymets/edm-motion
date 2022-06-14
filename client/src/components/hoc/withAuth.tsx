import { USER_AUTHORIZE } from "config/api"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { authorizeUser } from "store/actions/userActions"
import { getToken } from "utils/auth"

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
      const { user } = props
      dispatch(authorizeUser(user))
    }, [])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async (ctx) => {
    const token = getToken(ctx)
    let user: IUserEntity = null
    const response = await fetch(USER_AUTHORIZE, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })

    if (response.ok) {
      const json: IUserAuthorizeResponse = await response.json()
      if (json.status === "ok") {
        user = json.user
      }
    }

    const componentProps =
      WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, user }
  }

  return Wrapper
}

export default withAuth
