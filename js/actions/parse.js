import Parse from "parse/react-native"
import { InteractionManager } from "react-native"
import * as Types from "./actionTypes"

function logError(err) {
}

function loadParseQuery(type, query) {
  return (dispatch) => {
    return query.find({
      success: (list) => {
        // We don't want data loading to interfere with smooth animations
        InteractionManager.runAfterInteractions(() => {
          // Flow can't guarantee {type, list} is a valid action
          dispatch(({type, list}));
        });
      },
      error: logError,
    });
  };
}

export async function loadSessions() {
    console.log("loadSessions");
    await InteractionManager.runAfterInteractions();
    var query = new Parse.Query("Agenda").include("speakers").ascending("startTime");
    try {
    var list = await query.find();
    }
    catch (e) {
      console.log(e);
    }
    //console.log(list);
    return {
        type: Types.SESSIONS_LOADED,
        list: list,
    };
}
