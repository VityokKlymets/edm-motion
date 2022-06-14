import { useState } from "react"
import { NextPage } from "next"
import { Formik } from "formik"
import { post } from "utils/api"
import { Form, Grid, Segment, Button, Header, Icon, Message } from "semantic-ui-react"
import { USER_LOGIN } from "config/api"
import { login } from "utils/auth"
import BaseLayout from "components/layouts/BaseLayout"

import Head from "next/head"

const Login: NextPage = () => {
  const [error, setError] = useState("")

  const onSubmit = async (values: IUserLoginRequest, { setSubmitting }) => {
    setSubmitting(true)
    const response = await post<IUserLoginResponse>(USER_LOGIN, values)
    if (response.status === "ok") {
      const { token } = response
      login(token, "/admin/dashboard")
    }
    if (response.status === "error") {
      setError(response.error.message)
    }
    setSubmitting(false)
  }

  return (
    <BaseLayout pageTitle="Login">
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <meta name="robots" content="noindex" />
      </Head>
      <Grid
        textAlign="center"
        style={{ height: "100vh", background: "#fff" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="brown" textAlign="center">
            <Icon size="large" name="blind" />
            Please login
          </Header>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form loading={isSubmitting} onSubmit={handleSubmit} size="large">
                <Segment stacked={true}>
                  <Form.Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    name="email"
                    fluid={true}
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                  />
                  <Form.Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    name="password"
                    fluid={true}
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                  />
                  {error && <Message visible error header={error} />}
                  <Button type="submit" color="brown" fluid={true} size="large">
                    Login
                  </Button>
                </Segment>
              </Form>
            )}
          </Formik>
        </Grid.Column>
      </Grid>
    </BaseLayout>
  )
}

export default Login
