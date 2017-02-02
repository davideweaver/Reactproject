import React, { Component } from "react"
import { StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

export default class TabIcon extends Component {
    render() {
        var iconName = this.props.selected ? this.props.iconName : this.props.iconName + "-outline";
        return (
            <View style={styles.container}>
                <Icon name={iconName} style={[styles.icon, this.props.selected && styles.iconSelected]} />
                <Text style={[styles.title, this.props.selected && styles.titleSelected]}>
                    {this.props.title}
                </Text>
            </View>
        )
    }
}

let styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 4
  },
  title: {
      color: "#999999",
      fontSize: 10,
      padding: 0
  },
  titleSelected: {
      color: "#FF0000"
  },
  icon: {
      color: "#999999",
      fontSize: 28,
      padding: 0
  },
  iconSelected: {
      color: "#FF0000"
  }
})