import * as Types from "../actions/actionTypes"
import createParseReducer from "./createParseReducer"

const initialState = {
  sessions: [],
  sessionsSearchResults: []
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
        case Types.SESSIONS_LOADED:
            return {...state, sessions: action.list.map(fromParseSessions)};
        case Types.SESSIONS_SEARCH:
            return {...state, sessionsSearchResults: action.results};
        case Types.SESSIONS_SEARCH_CLEAR:
            return {...state, sessionsSearchResults: []};
        default:
            return state;
    }
}

