import React, { Component, PropTypes } from "react"
import { StyleSheet, Text } from "react-native"

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
    //fontFamily: "OpenSans",
  },
  light: {
    //fontFamily: "OpenSans-Light",
    fontWeight: "100"
  },
  bold: {
    //fontFamily: "OpenSans-Bold",
    fontWeight: "500"
  },
});