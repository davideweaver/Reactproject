import React, { Component } from "react"
import { StyleSheet, View, Button, Text } from "react-native"
import { connect } from "react-redux"
import ToolbarButton from "../components/toolbarButton"

class SessionView extends Component {

  static navigationOptions = {
    title: "Session",
    header: ({goBack}) => ({
      left: (
          <ToolbarButton
            name="arrow-left"
            onPress={() => goBack(null)}
          />
        )
    })
  }

  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    console.log("NAV: ", this.props.navigation)
  }

  render() {
    const { state } = this.props.navigation;
    console.log(state);
    var title = state.params.session.title;
    return (
      <View style={styles.container}>
        <Text>heelo {title}</Text>
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
      //session: state.params.session
    };
}

function actions(dispatch) {
    return {
    }
}

export default connect(select, actions)(SessionView)