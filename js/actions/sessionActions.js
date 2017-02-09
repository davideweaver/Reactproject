import Parse from "parse/react-native"
import { InteractionManager } from "react-native"
import * as Types from "./actionTypes"

function shouldLoadSessions(state) {
  return !(state.sessionData && state.sessionData.isLoadingSessions);
}

export function load() {
  return async (dispatch, getState) => {
    if(!shouldLoadSessions(getState())){
      return Promise.resolve();
    }

    dispatch({type: Types.SESSIONS_LOAD_START});

    await InteractionManager.runAfterInteractions();
    var query = new Parse.Query("Agenda").include("speakers").ascending("startTime");
    const data = await query.find();

    return dispatch({
      type: Types.SESSIONS_LOAD_DONE,
      results: data
    });
  }
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

export function addFavorite(id) {
  return {
    type: Types.SESSIONS_ADD_FAVORITE,
    id: id
  };
}

export function toggleFavorite(id) {
  return (dispatch, getState) => {  
    let favoriteSessionIds = getState().sessionData.favoriteSessionIds;
    const exists = favoriteSessionIds.includes(id);
    if (exists) {
      dispatch({
        type: Types.SESSIONS_REMOVE_FAVORITE,
        id: id
      })
    }
    else {
      dispatch({
        type: Types.SESSIONS_ADD_FAVORITE,
        id: id
      })
    }
  };
}

export function removeFavorite(id) {
  return {
    type: Types.SESSIONS_REMOVE_FAVORITE,
    id: id
  };
}
