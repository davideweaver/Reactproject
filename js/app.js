import React, { Component } from "react"
import { StyleSheet, View, StatusBar } from "react-native"
import Nav from "./nav"
import { connect } from "react-redux"

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
  };
}

function actions(dispatch) {
  return {
  }
}

export default connect(select, actions)(App)