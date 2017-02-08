import * as Types from "../actions/actionTypes"

const initialState = [];

export default function handleActions(state = initialState, action = {}) {
    switch (action.type) {
        case Types.SESSIONS_SEARCH:
            let diff = state.filter((text) => {
                return text.toLowerCase() != action.text.toLowerCase();
            });
            diff = diff.slice(0, 4);
            return [action.text, ...diff];
        case Types.SEARCHES_CLEAR:
            return [];
        default:
            return state;
    }
}
