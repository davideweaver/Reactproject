import { applyMiddleware, createStore, compose } from "redux"
import { persistStore, autoRehydrate } from "redux-persist"
import { AsyncStorage } from "react-native"
import thunk from "redux-thunk"
import promise from "./promise"
import reducers from "../reducers"

const middlewares = compose(applyMiddleware(thunk, promise), autoRehydrate());

export default {
    configure: () => {
        const store = createStore(reducers, undefined, middlewares);
        persistStore(store, {storage: AsyncStorage});
        return store;
    }
} 