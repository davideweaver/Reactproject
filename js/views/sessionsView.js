import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, ListView, Text, TouchableHighlight } from 'react-native'
import { connect } from "react-redux"
import ListHeader from "../components/listHeader"
import ToolbarButton from "../components/toolbarButton"
import { loadSessions } from "../actions/parse"
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
    this.props.loadSessions();
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

    var listHeader = (<ListHeader title={"Sessions"}>
      <ToolbarButton name="refresh" color={Color.tint} onPress={() => this.props.loadSessions()} />
      <ToolbarButton name="add" color={Color.tint} onPress={() => navigate("Modals", {}, "AddSession")} />
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
    );
  }

  _renderRow(session, sectionID, rowID, highlightRow) {
    const {navigate} = this.props.navigation;
    var onPress = () => {
      highlightRow(sectionID, rowID);
      //navigate("SessionStack", {}, {type: "Navigate", routeName: "Session", params: {session: session}});

      navigate("SessionsTab", {}, {
        type: "Navigate", 
        routeName: "SessionStack",
        action: {
          type: "Navigate", 
          routeName: "Session", 
          params: {session: session}
        }});


    };
    return (
      <TouchableHighlight onPress={onPress} underlayColor="#eee">
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {session.title}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 22
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    paddingLeft: 20
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  }
})

function cloneWithData(dataSource, data) {
  if (!data) {
    return dataSource.cloneWithRows([]);
  }
  if (Array.isArray(data)) {
    return dataSource.cloneWithRows(data);
  }
  return dataSource.cloneWithRowsAndSections(data);
}

function select(state) {
    return {
        sessions: state.sessions,
        isLoggedIn: false //store.user.isLoggedIn || store.user.hasSkippedLogin,
    };
}

function actions(dispatch) {
    return {
        loadSessions: () => dispatch(loadSessions()),
    }
}

export default connect(select, actions)(SessionsView)