import React, { Component } from "react"
import { StyleSheet, View, Button } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { CardStack } from "react-navigation"
import Styles, { Color } from "../styles"

const BackButton = CardStack.Header.BackButton;

class TemplateView extends Component {

  static navigationOptions = {
    title: "Template",
    header: ({goBack}) => ({
      left: (
        <BackButton
          onPress={() => goBack(null)}
          title="Back"
          />
        ),
        style: Styles.navbar
    })
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={Styles.screen}>
      </View>
    );
  }
}

let styles = StyleSheet.create({
})

function select(state) {
  return {
  };
}

function actions(dispatch) {
  return {
  }
}

export default connect(select, actions)(TemplateView)