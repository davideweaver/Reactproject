import React, { Component, PropTypes } from "react"
import { StyleSheet, View, Text, Button } from "react-native"

export default class ControlTemplate extends Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

ControlTemplate.defaultProps = {
  name: "Template"
}

ControlTemplate.propTypes = {
  name: React.PropTypes.string
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
