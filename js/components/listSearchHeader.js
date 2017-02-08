import React, { Component, PropTypes } from "react"
import { StyleSheet, View, Text, LayoutAnimation, TouchableOpacity } from "react-native"
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard"
import Toolbar from "./toolbar"
import Searchbar from "./searchbar"
import Styles, { Color, Dims } from "../styles"

export default class ListSearchHeader extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onSearchStarted: PropTypes.func,
    onSearchEnded: PropTypes.func,
    onSearchChange: PropTypes.func,
    onSearchSubmit: PropTypes.func
  }

  static defaultProps = {
    title: "Search",
    placeholder: "",
    onSearchStarted: () => {},
    onSearchEnded: () => {},
    onSearchChange: () => {},
    onSearchSubmit: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      isDone: false
    };
  }

  search(text) {
    this._onSearchBegin();
    this.refs.searchBar.value = text;
    this._onSearchSubmit(text);
  }

  render() {
    let marginTop = 0;
    let marginRight = 0;
    let paddingBottom = 0;
    if (this.state.isSearching) {
      marginTop = -70;
      marginRight = 65;
      paddingBottom = 70;
    }

    let btnText = this.state.isDone ? "Done" : "Cancel";

    return (
      <View style={[styles.container, {marginTop: marginTop, paddingBottom: paddingBottom}]}>
        <View style={styles.content}>
          <Text style={styles.text}>{this.props.title}</Text>
          <View style={styles.tools}>
            <Toolbar>
              {this.props.children}
            </Toolbar>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <Searchbar 
            ref="searchBar"
            placeholder={this.props.placeholder}
            onSearchChange={this._onSearchChange.bind(this)}
            onSearchSubmit={this._onSearchSubmit.bind(this)}
            onFocus={this._onSearchBegin.bind(this)}
            onBlur={() => false} />
          <TouchableOpacity 
            style={{marginRight: marginRight}}
            onPress={this._onSearchEnd.bind(this)}>
            <Text 
              style={styles.cancel}>
                {btnText}
              </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.border} />
      </View>
    )
  }

  _onSearchSubmit(text) {
    this.setState({isDone: true});
    this.props.onSearchSubmit(text);
  }

  _onSearchChange(text) {
    this.setState({isDone: false});
    this.props.onSearchChange(text);
  }

  _onSearchBegin() {
    LayoutAnimation.easeInEaseOut();
    this.setState({isSearching: true, isDone: false});
    this.props.onSearchStarted();
  }

  _onSearchEnd() {
    dismissKeyboard();
    LayoutAnimation.easeInEaseOut();
    this.setState({isSearching: false, isDone: false});
    this.refs.searchBar.value = "";
    this.props.onSearchEnded();
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background
  },
  content: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 26,
    paddingLeft: Dims.horzPadding,
    paddingRight: Dims.horzPadding,
    paddingBottom: 10
  },
  tools: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingBottom: 6
  },
  text: {
    flex: 1,
    fontSize: 40,
    fontWeight: "800",
    textAlignVertical: "bottom"
  },
  searchContainer: {
    flexDirection: "row",
    paddingLeft: Dims.horzPadding,
    paddingRight: Dims.horzPadding,
  },
  cancel: {
    color: Color.tint,
    fontSize: 16,
    marginTop: 3,
    marginLeft: 5,
    marginRight: -100,
    padding: 10
  },
  border: {
    //height: StyleSheet.hairlineWidth,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 255)",
    marginLeft: 20,
  }
})
