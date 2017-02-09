import React, { Component } from "react"
import { StyleSheet, View, Button } from "react-native"
import { connect } from "react-redux"
import { CardStack } from "react-navigation"

const BackButton = CardStack.Header.BackButton;

class ProfileEditView extends Component {

  static navigationOptions = {
    title: "Edit Profile",
    header: ({goBack}) => ({
      left: (
        <BackButton
          onPress={() => goBack(null)}
          title="Profile"
          />
        ),
        style: {backgroundColor: "white"}
    })
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
      
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
})

function select(state) {
  return {
  };
}

function actions(dispatch) {
  return {
  }
}

export default connect(select, actions)(ProfileEditView)