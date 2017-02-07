import { combineReducers } from "redux"
import sessions from "./sessions"
import searches from "./searches"
import sessionsSearched from "./sessionsSearched"

export default combineReducers({
  sessions: sessions,
  sessionsSearched: sessionsSearched,
  searches: searches
});