import Parse from "parse/react-native";
import { InteractionManager } from "react-native";

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
        type: "LOADED_SESSIONS",
        list: list,
    };
}

export async function loadSessions2() {
  const config = await Parse.Config.get(); 
  return {
    type: "LOADED_SESSIONS",
    config,
  };
}

/*
export function loadSessions() {
    loadParseQuery(
      "LOADED_SESSIONS",
      new Parse.Query("Agenda")
        .include("speakers")
        .ascending("startTime")
    )
}
*/

/*export default {
  loadSessions: () =>
    loadParseQuery(
      "LOADED_SESSIONS",
      new Parse.Query("Agenda")
        .include("speakers")
        .ascending("startTime")
    )
};*/
