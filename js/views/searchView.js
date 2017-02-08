import React, { Component, PropTypes } from "react"
import { StyleSheet, View, ListView, Text, TouchableHighlight, TouchableOpacity } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as sessionActions from "../actions/sessionActions"
import * as searchActions from "../actions/searchActions"
import ListSearchHeader from "../components/listSearchHeader"
import ActionSheet from "react-native-actionsheet"
import Styles, { Color, Dims } from "../styles"

class SearchView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    const dsResults = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections({"Recent":this.props.searches}),
      dataSourceResults: dsResults.cloneWithRows(this.props.sessionsSearched),
      isSearching: false
    };
    this._header = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searches !== nextProps.searches) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections({"Recent":nextProps.searches}),
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
          renderSeparator={this._renderSeparator.bind(this)}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          keyboardShouldPersistTaps="always"
          scrollEnabled={!this.state.isSearching}
        />
        {this._renderResultsList()}
        <ActionSheet 
          ref="actionSheet"
          options={["Clear Recent", "Cancel"]}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={this._handleActionSheet.bind(this)}
        />
      </View>
    );
  }

  _handleActionSheet(index) {
    if (index == 0) {
      this.props.searchActions.clear();
    }
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
        ref={component => this._header = component}
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
      this._searchWithText(rowData);
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

  _renderResultsRow(session, sectionID, rowID, highlightRow) {
    const {navigate} = this.props.navigation;
    var onPress = () => {
      highlightRow(sectionID, rowID);
      navigate("SearchTab", {}, {
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
          <View style={styles.rowResults}>
            <Text style={styles.textResults}>
              {session.title}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _renderSectionHeader(sectionData, category) {
    var onPress = () => {
      this.refs.actionSheet.show();
    }
    return (
      <View style={styles.section}>
        <Text style={styles.sectionText}>{category}</Text>
        <TouchableOpacity onPress={onPress} style={styles.sectionLink} underlayColor="#eee">
          <Text style={styles.sectionLinkText}>
            Clear
          </Text>
        </TouchableOpacity>
      </View>
    )
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

  _searchWithText(text) {
    this._header.search(text);
  }

  _showSearchResults(text) {
    this.props.sessionActions.search(text);
  }

  _onSearchStarted() {
    this.setState({isSearching: true});
  }

  _onSearchEnded() {
    this.setState({isSearching: false});
    this.props.sessionActions.searchClear();
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
    padding: 10,
    paddingLeft: 20,
    backgroundColor: "#fff"
  },
  text: {
    flex: 1,
    fontSize: 22,
    color: "red"
  },
  textResults: {
    flex: 1
  },
  results: {
    backgroundColor: "#eee",
    position: "absolute",
    top: 100,
    bottom: 0,
    left: 0,
    right: 0
  },
  section: {
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: Dims.horzPadding,
    paddingBottom: 5
  },
  sectionText: {
    flex:1,
    fontWeight: "700",
    fontSize: 22,
  },
  sectionLink: {

  },
  sectionLinkText: {
    color: Color.tint,
    textAlign: "right",
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 16
  }
})

function select(state) {
    return {
        searches: state.searches,
        sessionsSearched: state.sessionData.sessionsSearchResults
    };
}

function actions(dispatch) {
    return {
      sessionActions: bindActionCreators(sessionActions, dispatch),
      searchActions: bindActionCreators(searchActions, dispatch)
    }
}

export default connect(select, actions)(SearchView)