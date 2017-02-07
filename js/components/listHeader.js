import React, { Component, PropTypes } from "react"
import { StyleSheet, View, Text } from "react-native"
import Toolbar from "./toolbar"
import Styles, { Color, Dims } from "../styles"

export default class ListHeader extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  static defaultProps = {
  }

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
    paddingLeft: Dims.horzPadding,
    paddingRight: Dims.horzPadding,
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
