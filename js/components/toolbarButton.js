import React, { Component } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons"
import IonIcon from "react-native-vector-icons/Ionicons"
import EvilIcon from "react-native-vector-icons/EvilIcons"

export default class ToolbarButton extends Component {
  render() {

    var icon;

    switch (this.props.name) {
      case "arrow-back": {
        icon = (<IonIcon name="ios-arrow-back" size={20} color={this.props.color} style={styles.icon} />);
        break;
      }
      case "add": {
        icon = (<IonIcon name="ios-add" size={40} color={this.props.color} style={{marginTop:-9}} />);
        break;
      }
      case "close": {
        icon = (<EvilIcon name="close" size={30} color={this.props.color} style={{marginTop:-0}} />);
        break;
      }
      case "heart": {
        icon = (<IonIcon name="ios-heart" size={30} color={this.props.color} style={{marginTop:-0}} />);
        break;
      }
      case "heart-outline": {
        icon = (<IonIcon name="ios-heart-outline" size={30} color={this.props.color} style={{marginTop:-0}} />);
        break;
      }
      default: {
        icon = (<SimpleLineIcon name={this.props.name} size={20} color={this.props.color} style={styles.icon} />);
        break;
      }
    }

    return (
      <TouchableOpacity underlayColor="#3C5EAE" onPress={this.props.onPress}>
        <View style={[styles.container, {}]}>
            {icon}
        </View>
      </TouchableOpacity>
    )
  }
}

ToolbarButton.defaultProps = {
  name: "user",
  color: "#000",
  onPress: null
}

ToolbarButton.propTypes = {
  name: React.PropTypes.string,
  size: React.PropTypes.number,
  color: React.PropTypes.string,
  onPress: React.PropTypes.func
}

var styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingHorizontal: 8,
    paddingVertical: 2
  },
  icon: {
    padding: 0
  }
})
