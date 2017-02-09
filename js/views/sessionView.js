import React, { Component } from "react"
import { StyleSheet, View, Button, Text } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { CardStack } from "react-navigation"
import ToolbarButton from "../components/toolbarButton"
import * as sessionActions from "../actions/sessionActions"
import { Card, TouchableCard, CardGutter, MemoCard, InstagramPhotosCard } from '../components/cards';
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
        ),
        style: {backgroundColor: "white"}
    })
  }

  constructor(props) {
    super(props);
  }

  render() {
    const session = this.props.session;
    const favicon = session.isFavorite ? "heart" : "heart-outline";
    return (
      <View style={Styles.cardContainer}>
        <View style={styles.heading}>
          <Text style={styles.title}>{session.title}</Text>
          <ToolbarButton 
            style={styles.favButton}
            name={favicon} 
            color={Color.tint} 
            onPress={() => this.props.sessionActions.toggleFavorite(session.id)} />
        </View>
        <MemoCard title="Description" text={session.description} />
        <Card grouped={true}>
          <Text>{session.location}</Text>
        </Card>
        <Card>
          { this._renderTags(session.tags) }
        </Card>
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
}

let styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    marginTop: 6,
    fontSize: 18
  },
  favButton: {
    flex: 1
  },
  description: {
    marginBottom: 10
  }
})

function select(state, props) {
  return {
    session: state.sessionData.sessions.find(s => s.id == props.navigation.state.params.id)
  };
}

function actions(dispatch) {
  return {
    sessionActions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(select, actions)(SessionView)