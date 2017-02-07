import React, { Component } from "react"
import { StyleSheet, View, Button, Text } from "react-native"
import { connect } from "react-redux"
import { HeaderBackButton, CardStack } from "react-navigation"

const BackButton = CardStack.Header.BackButton;

class SessionView extends Component {

  static navigationOptions = {
    title: "Session",
    header: ({goBack}) => ({
      left: (
        <BackButton
          onPress={() => goBack(null)}
          title="All"
          />
        )
    })
  }

  constructor(props) {
    super(props);
    
  }

  _renderTags(tags) {
    return tags.map(function(tag, i){
      return(
        <View key={i}>
          <Text>{tag}</Text>
        </View>
      );
    });
  }

  render() {
    const { state } = this.props.navigation;
    const session = state.params.session;
    console.log(session);
    return (
      <View style={styles.container}>
        <Text style={styles.location}>{session.location}</Text>
        <Text style={styles.title}>{session.title}</Text>
        <Text style={styles.description}>{session.description}</Text>
        { this._renderTags(session.tags) }
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
  },
  location: {
    marginBottom: 10
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10
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