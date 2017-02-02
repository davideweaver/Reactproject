import React, { Component } from "react"
import { StyleSheet, View, StatusBar } from "react-native"
import Nav from "./nav"
import { connect } from "react-redux"
import { loadSessions } from "./actions/parse"

class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={false}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="dark-content"
          />
        <Nav />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function select(store) {
  return {
    isLoggedIn: false //store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

function actions(dispatch) {
  return {
    loadSessions: () => dispatch(loadSessions()),
  }
}

export default connect(select, actions)(App)