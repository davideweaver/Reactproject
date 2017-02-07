import React, { Component, PropTypes } from "react"
import { StyleSheet, View, ListView, Text, TouchableHighlight } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as sessionActions from '../actions/sessionActions';
import ListSearchHeader from "../components/listSearchHeader"
import Styles, { Color, Dims } from "../styles"

class SearchView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dsResults = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.searches),
      dataSourceResults: dsResults.cloneWithRows(this.props.sessionsSearched),
      isSearching: false
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.searches !== nextProps.searches) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.searches),
      });
    }
    if (this.props.sessionsSearched !== nextProps.sessionsSearched) {
      this.setState({
        dataSourceResults: this.state.dataSourceResults.cloneWithRows(nextProps.sessionsSearched),
      });
    }
  }

  render() {
    return (
      <View style={Styles.screenTop}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderHeader={this._renderHeader.bind(this)}
          enableEmptySections={true}
          renderSeparator={this._renderSeparator}
          keyboardShouldPersistTaps="always"
          scrollEnabled={!this.state.isSearching}
        />
        {this._renderResultsList()}
      </View>
    );
  }

  _renderResultsList() {
    if (this.state.isSearching) {
      return (
        <ListView
            style={styles.results}
            dataSource={this.state.dataSourceResults}
            renderRow={this._renderResultsRow.bind(this)}
            enableEmptySections={true}
            renderSeparator={this._renderSeparator}
            keyboardShouldPersistTaps="always"
          />
      )
    }
    else {
      return null;
    }
  }

  _renderHeader() {
    return (
      <ListSearchHeader 
        title="Search" 
        placeholder="Search sessions"
        onSearchSubmit={this._showSearchResults.bind(this)} 
        onSearchStarted={this._onSearchStarted.bind(this)} 
        onSearchEnded={this._onSearchEnded.bind(this)} 
        />
    )
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

  _renderResultsRow(rowData, sectionID, rowID, highlightRow) {
    const {navigate} = this.props.navigation;
    var onPress = () => {
      highlightRow(sectionID, rowID);
      navigate("FiltersStack");
    };
    return (
      <TouchableHighlight onPress={onPress} underlayColor="#eee">
        <View>
          <View style={styles.rowResults}>
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
          marginLeft: 20
        }}
      />
    );
  }

  _showSearchResults(text) {
    this.props.actions.search(text);
  }

  _onSearchStarted() {
    this.setState({isSearching: true});
  }

  _onSearchEnded() {
    this.setState({isSearching: false});
    this.props.actions.searchClear();
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
  rowResults: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 11,
    paddingLeft: Dims.horzPadding,
    paddingBottom: 11,
    backgroundColor: "#fff"
  },
  text: {
    flex: 1,
    fontSize: 22,
    color: "red"
  },
  results: {
    backgroundColor: "#eee",
    position: "absolute",
    top: 100,
    bottom: 0,
    left: 0,
    right: 0
  }
})

function select(state) {
    return {
        searches: state.searches,
        sessionsSearched: state.sessionsSearched
    };
}

function actions(dispatch) {
    return {
      actions: bindActionCreators(sessionActions, dispatch)
    }
}

export default connect(select, actions)(SearchView)