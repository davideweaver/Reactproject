import React, { Component } from "react"
import { StyleSheet, View, Button } from "react-native"
import { connect } from "react-redux"
import { CardStack } from "react-navigation"

const BackButton = CardStack.Header.BackButton;

class EmptyView extends Component {

  static navigationOptions = {
    title: "Empty",
    header: ({goBack}) => ({
      left: (
        <BackButton
          onPress={() => goBack(null)}
          title="Discover"
          />
        )
    })
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
      <Button
        onPress={() => this.props.navigation.navigate("SecondFilter")}
        title="Go to second filter"
      />
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

export default connect(select, actions)(EmptyView)