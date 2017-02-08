import React, { Component, PropTypes } from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

const placeholderColor = "#bbbbbb"

export default class Searchbar extends Component {

  static propTypes = {
    placeholder: PropTypes.string,
    onSearchChange: PropTypes.func,
    onSearchSubmit: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  static defaultProps = {
    placeholder: "Search",
    onSearchChange: () => {},
    onSearchSubmit: () => {},
    onFocus: () => {},
    onBlur: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  get value() {
    return this.state.value;
  }

  set value(text) {
    this.setState({value: text});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.border}>
          <Icon 
            name="search" 
            size={25} 
            color="#777777" 
            style={styles.icon} />
          <TextInput 
            value={this.state.value}
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            onChangeText={this._onChangeText.bind(this)}
            placeholder={this.props.placeholder}
            placeholderTextColor={placeholderColor}
            underlineColorAndroid="transparent" 
            returnKeyType="search"
            selectTextOnFocus={true}
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={this._onSubmitEnding.bind(this)}
            />
        </View>
      </View>
    )
  }

  _onChangeText(e) {
    this.setState({value: e});
    this.props.onSearchChange(e);
  }

  _onSubmitEnding(e) {
    this.props.onSearchSubmit(e.nativeEvent.text)
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  border: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(240, 240, 240, 255)",
    borderRadius: 6,
  },
  icon: {
    width: 30,
    marginLeft: 10
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 22
  }
})