import PrimaryForm from "components/forms/PrimaryForm"
import InlineError from "components/messages/InlineError"

import lockIcon from "./assets/lock.svg"
import userIcon from "./assets/user.svg"

import styles from "styles/forms/login.module.sass"

import isEmail from "validator/lib/isEmail"
import { FC } from "react"

interface IProps {
  error?: string
  loading?: boolean
  onSubmit: (data) => void
}

interface IValidationErrors {
  email: string
  password: string
}

const LoginForm: FC<IProps> = ({ loading, error, onSubmit }) => {
  const initialValues: IUserAddRequest = {
    email: "",
    password: "",
  }

  const validate = (values: IUserAddRequest) => {
    const errors: IValidationErrors = {
      email: "",
      password: "",
    }
    const { email, password } = values

    if (!password) {
      errors.password = "It's required field"
    }
    if (!isEmail(email)) {
      errors.email = "Invalid email"
    }
    if (!email) {
      errors.email = "It's required field"
    }
    if (Object.values(errors).join("").length === 0) {
      return {}
    }
    return errors
  }

  return (
    <div>
      <h1 className={styles.header}>Log in</h1>
      {error && <InlineError message={error} />}
      <PrimaryForm
        validate={validate}
        initialValues={initialValues}
        onSubmit={onSubmit}
        loading={loading}
        submitText="Log in"
        fields={[
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "example@example.com",
            icon: userIcon,
          },
          {
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "password",
            icon: lockIcon,
          },
        ]}
      />
    </div>
  )
}

export default LoginForm
