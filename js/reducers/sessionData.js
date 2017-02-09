import * as Types from "../actions/actionTypes"

const initialState = {
  sessions: [],
  isLoadingSessions: false,
  sessionsSearchResults: [],
  favoriteSessionIds: []
};

function fromParseSession(obj, state) {
  let session = {
    id: obj.id,
    day: obj.get('day'),
    allDay: obj.get('allDay'),
    title: obj.get('sessionTitle'),
    description: obj.get('sessionDescription'),
    hasDetails: obj.get('hasDetails'),
    slug: obj.get('sessionSlug'),
    onMySchedule: obj.get('onMySchedule'),
    tags: obj.get('tags') || [],
    startTime: obj.get('startTime') && obj.get('startTime').getTime(),
    endTime: obj.get('endTime') && obj.get('endTime').getTime(),
    map: obj.get('sessionMap') && obj.get('sessionMap').url(),
    location: obj.get('sessionLocation'),
  };
  session.isFavorite = state.favoriteSessionIds.find(id => id == obj.id) !== undefined;
  return session;
}

export default function handleActions(state = initialState, action = {}) {
  switch (action.type) {

    case Types.SESSIONS_LOAD_START: {
      return {...state, isLoadingSessions: true};
    }

    case Types.SESSIONS_LOAD_DONE: {
      return {...state, isLoadingSessions: false, sessions: action.results.map(s => fromParseSession(s, state))};
    }

    case Types.SESSIONS_SEARCH: {
      return {...state, sessionsSearchResults: action.results}
    }

    case Types.SESSIONS_SEARCH_CLEAR: {
      return {...state, sessionsSearchResults: []}
    }

    case Types.SESSIONS_ADD_FAVORITE: {
      var sessions = state.sessions.map(s => {
        if (s.id !== action.id) 
          return s;
        return {...s, isFavorite: true};    
      });
      const favorites = state.favoriteSessionIds.filter(id => id != action.id);
      return {...state, sessions: sessions, favoriteSessionIds: [...favorites, action.id]}
    }

    case Types.SESSIONS_REMOVE_FAVORITE: {
      var sessions = state.sessions.map(s => {
        if (s.id !== action.id) 
          return s;
        return {...s, isFavorite: false};    
      });
      const ids = state.favoriteSessionIds.filter(id => id != action.id);
      return {...state, sessions: [...sessions], favoriteSessionIds: [...ids]}
    }
    
    default:
      return state;
  }
}


