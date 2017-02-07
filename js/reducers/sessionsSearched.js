import * as Types from "../actions/actionTypes"

const initialState = [];

export default function handleActions(state = initialState, action = {}) {
    switch (action.type) {
        case Types.SESSIONS_SEARCH:
            return ["billy", "bob"];
        case Types.SESSIONS_SEARCH_CLEAR:
            return [];
        default:
            return state;
    }
}
