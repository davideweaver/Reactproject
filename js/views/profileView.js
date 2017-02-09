import React, { Component } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as profileActions from "../actions/profileActions"
import ToolbarButton from "../components/toolbarButton"
import ImagePicker from "react-native-image-crop-picker"
import Styles, { Color, Dims } from "../styles"

class ProfileView extends Component {

  static navigationOptions = {
    title: "You",
    header: ({goBack}) => ({
      right: (
        <TouchableOpacity onPress={() => goBack(null)}>
          <Text style={Styles.navbarButtonText}>Done</Text>
        </TouchableOpacity>
        )
    })
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let avatar = null;
    if (this.props.avatar.uri)
      avatar = (<Image style={styles.avatar} source={this.props.avatar} />)

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._choosePicture.bind(this)}>
          <Text>Choose Picture</Text>
        </TouchableOpacity>
        {avatar}
        <TouchableOpacity onPress={this._testError.bind(this)}>
          <Text>Throw Exception</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _testError() {
    throw new Error("Test Exception");
  }

  _choosePicture() {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      cropperCircleOverlay: true,
      includeBase64: true
    }).then(image => {
      this.props.profileActions.saveImage(`data:${image.mime};base64,`+ image.data, image.width, image.height);
    });
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatar: {
    width: 40, 
    height: 40, 
    resizeMode: "contain", 
    borderRadius: 20
  }
})

function select(state) {
  return {
    avatar: state.profile.image
  };
}

function actions(dispatch) {
  return {
    profileActions: bindActionCreators(profileActions, dispatch)
  }
}

export default connect(select, actions)(ProfileView)