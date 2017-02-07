import * as Types from "../actions/actionTypes"

const initialState = [];

export default function handleActions(state = initialState, action = {}) {
    switch (action.type) {
        case Types.SESSIONS_SEARCH:
            return [...state, action.text];
        default:
            return state;
    }
}
