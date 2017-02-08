import React, { Component, PropTypes } from "react"
import { StyleSheet, View, ListView, Text, TouchableHighlight } from "react-native"
import ListHeader from "../components/listHeader"
import { connect } from "react-redux"
import Styles, { Color, Dims } from "../styles"

class DiscoverView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        "Popular Sessions", "New Sessions", "Popular Speakers"
      ])
    };
  }
  
  render() {
    return (
      <View style={Styles.screenTop}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderHeader={() => <ListHeader title={"Discover"}/>}
          enableEmptySections={true}
          renderSeparator={this._renderSeparator}
        />
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    const {navigate} = this.props.navigation;
    var onPress = () => {
      highlightRow(sectionID, rowID);
      navigate("FiltersStack");
    };
    return (
      <TouchableHighlight onPress={onPress} underlayColor="#eee">
        <View>
          <View style={styles.row}>
            <Text style={[styles.text, {color:Color.tint}]}>
              {rowData}
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
          marginLeft: Dims.horzPadding
        }}
      />
    );
  }
}

let styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 11,
    paddingLeft: Dims.horzPadding,
    paddingBottom: 11
  },
  text: {
    flex: 1,
    fontSize: 22,
    color: "red"
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

export default connect(select, actions)(DiscoverView)