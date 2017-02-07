import * as Types from "./actionTypes"

export function search(text) {
  return {
    type: Types.SESSIONS_SEARCH,
    text: text
  };
}

export function searchClear() {
  return {
    type: Types.SESSIONS_SEARCH_CLEAR
  };
}
