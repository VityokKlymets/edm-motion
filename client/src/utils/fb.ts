export const APP_ID = "871317073687953"

export const initFacebookSdk = () => {

    window.fbAsyncInit = () => {
    window.FB.init({
      appId: APP_ID,
      cookie: true,
      xfbml: true,
      version: "v8.0",
    })
  }

  ;((d, s, id) => {
    let js
    const fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = "https://connect.facebook.net/en_US/sdk.js"
    fjs.parentNode.insertBefore(js, fjs)
  })(document, "script", "facebook-jssdk")
}
