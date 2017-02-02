import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { connect } from "react-redux"
import ToolbarButton from "../components/toolbarButton"

class AddSessionView extends Component {

  static navigationOptions = {
    title: "Add Session",
    header: ({goBack}) => ({
      right: (
          <ToolbarButton
            name="close"
            onPress={() => goBack(null)}
          />
        )
    })
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {goBack} = this.props.navigation;

    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
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

export default connect(select, actions)(AddSessionView)