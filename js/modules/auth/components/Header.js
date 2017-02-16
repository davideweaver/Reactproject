import React, { Component, PropTypes } from "react"
import { StyleSheet, View, Text, Button } from "react-native"

export default class Header extends Component {

  static propTypes = {
    name: PropTypes.string
  }

  static defaultProps = {
    name: "Template"
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
