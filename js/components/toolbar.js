import React, { Component, PropTypes } from "react"
import { StyleSheet, View, Text, Button } from "react-native"

export default class Toolbar extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }
}

Toolbar.defaultProps = {
}

Toolbar.propTypes = {
}

var styles = StyleSheet.create({
  container: {
    height: 28,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
})
