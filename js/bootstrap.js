import React, { Component } from "react"
import { Provider } from "react-redux"
import Parse from "parse/react-native"
import App from "./app"
import Config from "./config"
import Store from "./store"
import codePush from "react-native-code-push"

export default function bootstrap() {

    console.log("Parse: ", Config.serverKey, Config.serverURL)

    Parse.initialize(Config.serverKey);
    Parse.serverURL = `${Config.serverURL}/parse`;

    class Root extends Component {
        constructor() {
            super();
            this.state = {
                store: Store.configure(),
            };
        }

        render() {
            return (
                <Provider store={this.state.store}>
                    <App />
                </Provider>
            );
        }
    }

    return codePush({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE })(Root);
}