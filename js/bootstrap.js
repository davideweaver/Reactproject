import React, { Component } from "react"
import { Provider } from "react-redux"
import Parse from "parse/react-native"
import App from "./app"
import config from "./config"
import configureStore from "./store/configureStore"

export default function bootstrap() {

    console.log("Parse: ", config.serverKey, config.serverURL)

    Parse.initialize(config.serverKey);
    Parse.serverURL = `${config.serverURL}/parse`;

    class Root extends Component {
        constructor() {
            super();
            this.state = {
                store: configureStore(),
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

    return Root;
}