import { combineReducers } from "redux"
import sessionData from "./sessionData"
import searches from "./searches"

export default combineReducers({
  sessionData: sessionData,
  searches: searches
});