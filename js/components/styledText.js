import React, { Component, PropTypes } from "react"
import { StyleSheet, Text } from "react-native"
import Styles, { Color, Dims, TextSize } from "../styles"

export class SmallText extends Component {
  render() {
    return (
      <Text {...this.props} style={[this.props.style, styles.small]} />
    );
  }
}

export class RegularText extends Component {
  render() {
    return (
      <Text {...this.props} style={[this.props.style, styles.regular]} />
    );
  }
}

export class LightText extends Component {
  render() {
    return (
      <Text {...this.props} style={[this.props.style, styles.light]} />
    );
  }
}

export class BoldText extends Component {
  render() {
    return (
      <Text {...this.props} style={[this.props.style, styles.bold]} />
    );
  }
}

const styles = StyleSheet.create({
  regular: {
    fontSize: TextSize.normal
  },
  small: {
    fontSize: TextSize.small
  },
  light: {
    fontWeight: "100",
    fontSize: TextSize.normal
  },
  bold: {
    fontWeight: "500",
    fontSize: TextSize.normal
  },
});