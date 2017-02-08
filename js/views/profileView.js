import React, { Component } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import ToolbarButton from "../components/toolbarButton"
import Styles, { Color, Dims } from "../styles"

class ProfileView extends Component {

  static navigationOptions = {
    title: "You",
    header: ({goBack}) => ({
      right: (
        <TouchableOpacity onPress={() => goBack(null)}>
          <Text style={Styles.navbarButtonText}>Done</Text>
        </TouchableOpacity>
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

export default connect(select, actions)(ProfileView)