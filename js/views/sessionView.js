import React, { Component } from "react"
import { StyleSheet, View, Button, Text, ScrollView, Platform, Linking } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { CardStack } from "react-navigation"
import MapView from "react-native-maps"
import ToolbarButton from "../components/toolbarButton"
import * as sessionActions from "../actions/sessionActions"
import { Card, TouchableCard, CardGutter, MemoCard, InstagramPhotosCard } from '../components/cards';
import Styles, { Color, TextSize } from "../styles"

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
    const location = `${session.location} Building`
    return (
      <View style={Styles.cardContainer}>
        <ScrollView>
          <View style={styles.heading}>
            <Text style={styles.title}>{session.title}</Text>
            <ToolbarButton 
              style={styles.favButton}
              name={favicon} 
              color={Color.tint} 
              onPress={() => this.props.sessionActions.toggleFavorite(session.id)} />
          </View>
          <MemoCard title="Description" text={session.description} />
          <CardGutter />
          <Card grouped={true} text={location} />
          <Card>
            {this._renderTags(session.tags)}
          </Card>
          <CardGutter />
          <Card style={styles.mapContainer}>
            <MapView style={styles.map}
              initialRegion={{
              latitude: 40.053275,
              longitude: -76.300251,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
              <MapView.Marker
                coordinate={{latitude: 40.053275, longitude: -76.300251}}
                title={location}
                description={session.title}
              />
            </MapView>
          </Card>
          <TouchableCard 
            text="Open in Maps" 
            accessory={true}
            onPress={this._handleOpenInMaps.bind(this)} />
        </ScrollView>
      </View>
    );
  }

  _renderTags(tags) {
    return tags.map(function(tag, i){
      return(
        <View key={i}>
          <Text style={styles.tag}>{tag}</Text>
        </View>
      );
    });
  }

  _handleOpenInMaps = () => {
    let address = "355 East Liberty Street"
    let postalCode = "17602"
    let city = "Lancaster"

    let daddr = encodeURIComponent(`${address} ${postalCode}, ${city}`);

    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
    } else {
      Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
    }
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
  },
  tag: {
    fontSize: TextSize.normal
  },
  mapContainer: {
    height: 150
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 150,
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