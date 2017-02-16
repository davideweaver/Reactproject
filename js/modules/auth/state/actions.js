import * as Types from "./types"
import { appAuthToken } from "../lib/appAuthToken"
import Parse from "parse/react-native"
import { NavigationActions } from "react-navigation"
import { InteractionManager } from "react-native"

export function login(username, password, navigation) {
  return async dispatch => {

    dispatch({type: Types.LOGIN_REQUEST});
    
    try {
      //var json = await Parse.User.logIn(username, password)
      var json = {};

      return appAuthToken.storeSessionToken(json)
      .then(() => {
        dispatch({type: Types.LOGIN_SUCCESS, payload: json});

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: "Tabs"})
          ]
        })
        navigation.dispatch(resetAction)

        dispatch({type: Types.LOGOUT});
      })
    }
    catch (e) {
      dispatch({type: Types.LOGIN_FAILURE, payload: e});
    }
  }
}

export function logout(navigation) {
  return async dispatch => {

    navigation.goBack(null);
    await InteractionManager.runAfterInteractions();
    navigation.navigate("Login");

    dispatch({type: Types.LOGOUT_SUCCESS});
  }
}

export function onAuthFormFieldChange(field, value) {
  return {
    type: Types.ON_AUTH_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  }
}