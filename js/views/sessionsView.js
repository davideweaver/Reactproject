import React, { Component, PropTypes } from "react"
import { StyleSheet, View, ListView, Text, TouchableHighlight } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import ListHeader from "../components/ListHeader"
import ToolbarButton from "../components/ToolbarButton"
import * as sessionActions from "../actions/sessionActions"
import IonIcon from "react-native-vector-icons/Ionicons"
import Styles, { Color } from "../styles"

class SessionsView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.sessions)
    };
  }

  componentDidMount() {
    this.props.sessionActions.load();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sessions !== nextProps.sessions) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.sessions),
      });
    }
  }

  render() {
    const {navigate} = this.props.navigation;

    // <ToolbarButton name="add" color={Color.tint} onPress={() => navigate("Modals", {}, "AddSession")} />

    var listHeader = (<ListHeader title={"Sessions"} isLoading={this.props.isLoading}>
      <ToolbarButton name="refresh" color={Color.tint} onPress={() => this.props.sessionActions.load()} />
    </ListHeader>)

    return (
      <View style={Styles.screenTop}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderHeader={() => listHeader}
          enableEmptySections={true}
          renderSeparator={this._renderSeparator}
        />
      </View>
    )
  }

  _renderRow(session, sectionID, rowID, highlightRow) {
    const {navigate} = this.props.navigation;
    var onPress = () => {
      navigate("SessionsTab", {}, {
        type: "Navigation/NAVIGATE", 
        routeName: "SessionStack",
        action: {
          type: "Navigation/NAVIGATE", 
          routeName: "Session", 
          params: {id: session.id}
        }});
    };
    let icon = null;
    if (session.isFavorite)
      icon = <IonIcon name="ios-heart" color={Color.tint} size={15} />
    return (
      <TouchableHighlight onPress={onPress} underlayColor="#eee">
        <View style={styles.row}>
          <Text style={styles.text}>
            {session.title}
          </Text>
          <View style={styles.favIconContainer}>
            {icon}
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _hasRowChanged(sessionOld, sessionNew) {
    var oldFav = this.props.sessionsSaved.find((s) => s.id == sessionOld.id);
    var newFav = this.props.sessionsSaved.find((s) => s.id == sessionNew.id);
    var changed = (sessionOld !== sessionNew || oldFav !== newFav)
    if (changed)
      return true;
    return false;
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: StyleSheet.hairlineWidth,
          backgroundColor: "rgba(225, 225, 225, 255)",
          marginLeft: 20
        }}
      />
    );
  }
}

let styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  text: {
    flex: 1,
    fontSize: 18,
    paddingRight: 20
  },
  favIconContainer: {
  
  }
})

function select(state) {
  return {
    sessions: state.sessionData.sessions,
    isLoading: state.sessionData.isLoadingSessions
  };
}

function actions(dispatch) {
  return {
    sessionActions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(select, actions)(SessionsView)