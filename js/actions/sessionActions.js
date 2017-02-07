import Parse from "parse/react-native"
import { InteractionManager } from "react-native"
import * as Types from "./actionTypes"

export async function load() {
    await InteractionManager.runAfterInteractions();
    var query = new Parse.Query("Agenda").include("speakers").ascending("startTime");
    try {
        var list = await query.find();
    }
    catch (e) {
      console.log(e);
    }
    return {
        type: Types.SESSIONS_LOADED,
        list: list,
    };
}

export function searchClear() {
  return {
    type: Types.SESSIONS_SEARCH_CLEAR
  };
}

export function search(text) {
    return (dispatch, getState) => {
        let sessions = getState().sessionData.sessions;
        let results = sessions.filter((session) => {
            return session.title.toLowerCase().indexOf(text) >= 0;
        });
        dispatch({
            type: Types.SESSIONS_SEARCH,
            text: text,
            results: results
        })
    }
}
