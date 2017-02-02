import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import promise from "./promise";
import reducers from "../reducers";

var appCreateStore = applyMiddleware(thunk, promise)(createStore);

export default function configureStore(onComplete) {
  //const store = autoRehydrate()(createF8Store)(reducers);
  //persistStore(store, {storage: AsyncStorage}, onComplete);
  const store = appCreateStore(reducers);
  return store;
}