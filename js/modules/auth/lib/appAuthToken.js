import store from "react-native-simple-store"

export class AppAuthToken {

  constructor () {
    this.SESSION_TOKEN_KEY = "SESSION_TOKEN"
  }

  storeSessionToken (sessionToken) {
    return store.save(this.SESSION_TOKEN_KEY, {
      sessionToken: sessionToken
    })
  }

  getSessionToken (sessionToken) {
    if (sessionToken) {
      return store.save(this.SESSION_TOKEN_KEY, {
        sessionToken: sessionToken
      }).then(() => {
        return store.get(this.SESSION_TOKEN_KEY)
      })
    }
    return store.get(this.SESSION_TOKEN_KEY)
  }

  deleteSessionToken () {
    return store.delete(this.SESSION_TOKEN_KEY)
  }
}

// The singleton variable
export let appAuthToken = new AppAuthToken()
