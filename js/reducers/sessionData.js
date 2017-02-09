import * as Types from "../actions/actionTypes"

const initialState = {
  sessions: [],
  isLoadingSessions: false,
  sessionsSearchResults: [],
  sessionsSaved: []
};

function fromParseSessions(session) {
  return {
    id: session.id,
    day: session.get('day'),
    allDay: session.get('allDay'),
    title: session.get('sessionTitle'),
    description: session.get('sessionDescription'),
    hasDetails: session.get('hasDetails'),
    slug: session.get('sessionSlug'),
    onMySchedule: session.get('onMySchedule'),
    tags: session.get('tags') || [],
    startTime: session.get('startTime') && session.get('startTime').getTime(),
    endTime: session.get('endTime') && session.get('endTime').getTime(),
    map: session.get('sessionMap') && session.get('sessionMap').url(),
    location: session.get('sessionLocation'),
  };
}

export default function handleActions(state = initialState, action = {}) {
  switch (action.type) {
    
    case Types.SESSIONS_LOAD_START: {
      return Object.assign({}, state, {
        isLoadingSessions: true
      });
    }

    case Types.SESSIONS_LOAD_DONE: {
      return Object.assign({}, state, {
        sessions: action.results.map(fromParseSessions), 
        isLoadingSessions: false
      });
    }

    case Types.SESSIONS_SEARCH: {
      return Object.assign({}, state, {
        sessionsSearchResults: action.results
      });
    }

    case Types.SESSIONS_SEARCH_CLEAR: {
      return Object.assign({}, state, {
        sessionsSearchResults: []
      });
    }

    case Types.SESSIONS_ADD_FAVORITE: {
      const session = state.sessions.filter(session => session.id == action.id)[0];
      const sessions = state.sessionsSaved.filter(session => session.id != action.id);
      return Object.assign({}, state, {
        sessionsSaved: [...sessions, session]
      });
    }

    case Types.SESSIONS_TOGGLE_FAVORITE: {
      const session = state.sessions.filter(session => session.id == action.id)[0];
      const add = state.sessionsSaved.filter(session => session.id == action.id).length == 0;
      let sessions = [];
      if (add) {
        sessions = [...state.sessionsSaved, session]
      }
      else {
        sessions = state.sessionsSaved.filter(session => session.id != action.id);
      }
      return Object.assign({}, state, {
        sessionsSaved: sessions
      });
    }

    case Types.SESSIONS_REMOVE_FAVORITE: {
      const sessions = state.sessionsSaved.filter(session => session.id != action.id);
      return Object.assign({}, state, {
        sessionsSaved: sessions
      });
    }
    default:
      return state;
  }
}


