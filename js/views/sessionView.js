import React, { Component } from "react"
import { StyleSheet, View, Button, Text } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { CardStack } from "react-navigation"
import ToolbarButton from "../components/toolbarButton"
import * as sessionActions from "../actions/sessionActions"
import Styles, { Color } from "../styles"

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
    this.state = {
      session: this.props.navigation.state.params.session
    };
  }

  render() {
    const session = this.state.session;
    const favicon = this._isFavorite ? "heart" : "heart-outline";
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>{session.title}</Text>
          <ToolbarButton 
            style={styles.favButton}
            name={favicon} 
            color={Color.tint} 
            onPress={() => this.props.sessionActions.toggleFavorite(session.id)} />
        </View>
        <Text style={styles.description}>{session.description}</Text>
        <Text style={styles.location}>{session.location}</Text>
        { this._renderTags(session.tags) }
      </View>
    );
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

  get _isFavorite() {
    let x = this.props.favs.find((s) => s.id == this.state.session.id);
    return x;
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15
  },
  location: {
    marginBottom: 10
  },
  heading: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 10
  },
  favButton: {
    flex: 1
  },
  description: {
    marginBottom: 10
  }
})

function select(state) {
  return {
    favs: state.sessionData.sessionsSaved
  };
}

function actions(dispatch) {
  return {
    sessionActions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(select, actions)(SessionView)