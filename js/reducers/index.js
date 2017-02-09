import { combineReducers } from "redux"
import sessionData from "./sessionData"
import profile from "./profile"
import searches from "./searches"

export default combineReducers({
  sessionData: sessionData,
  profile: profile,
  searches: searches
});