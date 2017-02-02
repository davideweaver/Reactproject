import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"
import Toolbar from "./toolbar"
import Styles, { Color } from "../styles"

export default class ListHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>{this.props.title}</Text>
          <View style={styles.tools}>
            <Toolbar>
              {this.props.children}
            </Toolbar>
          </View>
        </View>
        <View style={styles.border} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background
  },
  content: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 26,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10
  },
  tools: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingBottom: 6
  },
  text: {
    flex: 1,
    fontSize: 40,
    fontWeight: "800",
    textAlignVertical: "bottom"
  },
  border: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(225, 225, 225, 255)",
    marginLeft: 20
  }
});
