import React, { Component, PropTypes } from "react"
import { StyleSheet, View, ListView, Text, TouchableHighlight } from "react-native"
import ListHeader from "../components/listHeader"
import { connect } from "react-redux"
import ToolbarButton from "../components/toolbarButton"
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
      navigate("FiltersStack");
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
  row: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    paddingLeft: 20
  },
  text: {
    flex: 1
  }
})

function select(state) {
  return {
    favs: state.sessionData.sessionsSaved
  };
}

function actions(dispatch) {
  return {
  }
}

export default connect(select, actions)(FavoritesView)