import React, { Component, PropTypes } from "react"
import { StyleSheet, View, ListView, Text, TouchableHighlight, TouchableOpacity, Alert } from "react-native"
import { bindActionCreators } from "redux"
import ListHeader from "../components/listHeader"
import { SwipeListView } from "react-native-swipe-list-view"
import { connect } from "react-redux"
import ToolbarButton from "../components/toolbarButton"
import * as sessionActions from "../actions/sessionActions"
import Styles, { Color } from "../styles"

class FavoritesView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.favs)
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.favs !== nextProps.favs) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.favs),
      });
    }
  }

  render() {
    const {navigate} = this.props.navigation;

    var listHeader = (<ListHeader title={"Favorites"} isLoading={this.props.isLoading}>
      <ToolbarButton name="user" color={Color.tint} onPress={() => navigate("Modals", {}, {type: "Navigation/NAVIGATE", routeName: "Profile"})} />
    </ListHeader>)

    return (
      <View style={Styles.screenTop}>
        <SwipeListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderHeader={() => listHeader}
          enableEmptySections={true}
          renderSeparator={this._renderSeparator}
          renderHiddenRow={(data, secId, rowId, rowMap) => (
            <TouchableOpacity 
              style={styles.actionRightBtn} 
              onPress={() => this._handleActionClick(data, secId, rowId, rowMap)}>
              <Text style={styles.actionRightBtnText}>Delete</Text>
            </TouchableOpacity>
          )}
          disableRightSwipe={true}
          rightOpenValue={-75}
        />
      </View>
    );
  }

  _renderRow(session, sectionID, rowID, highlightRow) {
    const {navigate} = this.props.navigation;
    var onPress = () => {
      navigate("FavoritesTab", {}, {
        type: "Navigation/NAVIGATE", 
        routeName: "SessionStack",
        action: {
          type: "Navigation/NAVIGATE", 
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

  _handleActionClick(data, secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow();
    this.props.sessionActions.removeFavorite(data.id);
  }
}

let styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    paddingLeft: 20,
    backgroundColor: "white"
  },
  text: {
    flex: 1,
    fontSize: 16
  },
  actionRightBtnText: {
		color: "#FFF"
	},
  actionRightBtn: {
		alignItems: "center",
		bottom: 0,
		justifyContent: "center",
		position: "absolute",
		top: 0,
		width: 75,
		backgroundColor: "red",
		right: 0
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

export default connect(select, actions)(FavoritesView)