import { Record } from "immutable"
import { REHYDRATE } from "redux-persist/constants"
import * as Types from "./types"
import validateAction from "./validation"

const AuthRecord = Record({
    form: new Record({
        state: "REGISTER",
        disabled: false,
        error: null,
        isValid: false,
        isFetching: false,
        fields: new Record({
            username: "",
            usernameHasError: false,
            usernameErrorMsg: "",
            email: "",
            emailHasError: false,
            emailErrorMsg: "",
            password: "",
            passwordHasError: false,
            passwordErrorMsg: "",
            passwordAgain: "",
            passwordAgainHasError: false,
            passwordAgainErrorMsg: "",
            showPassword: false
        })()
    })()
})

var initialState = new AuthRecord();

export default function handleActions(state = initialState, action = {}) {

  switch (action.type) {

    case REHYDRATE: {
      if (action.payload["auth"]) {
        state = new AuthRecord().mergeDeep(action.payload["auth"]);
      }
      return state;  
    }

    case Types.LOGIN_SUCCESS: {
      const {field, value} = action.payload;
      let nextState = state.setIn(["form", "isValid"], true)
        .setIn(["form", "error"], null);

      return nextState;
    }

    case Types.LOGOUT_SUCCESS: {
      let nextState = state.setIn(["form", "isValid"], false)
        .setIn(["form", "error"], null);

      console.log("nextState", nextState, nextState.form.isValid)

      return nextState;
    }

    case Types.ON_AUTH_FORM_FIELD_CHANGE: {
      const {field, value} = action.payload;
      let nextState = state.setIn(["form", "fields", field], value)
          .setIn(["form", "error"], null);

      return validateAction(nextState, action)
    }



    default:
      return state;
  }
}
