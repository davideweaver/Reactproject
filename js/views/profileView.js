import React, { Component } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as profileActions from "../actions/profileActions"
import { authActions } from "../modules/auth"
import ToolbarButton from "../components/ToolbarButton"
import ImagePicker from "react-native-image-crop-picker"
import { Field, FieldGroup, TouchableField, FieldGutter, DescriptionField, InstagramPhotosField } from "react-native-fields"
import Styles, { Color, Dims, TextSize } from "../styles"

class ProfileView extends Component {

  static navigationOptions = {
    title: "Profile",
    header: ({goBack}) => ({
      right: (
        <TouchableOpacity onPress={() => goBack(null)}>
          <Text style={Styles.navbarActiveButtonText}>Done</Text>
        </TouchableOpacity>
        ),
        style: Styles.navbar
    })
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
    const profile = this.props.profile;

    let avatar = null;
    if (profile.avatar.uri)
      avatar = (<Image style={styles.avatar} source={profile.avatar} />)

    return (
      <View style={Styles.cardContainer}>
        <ScrollView>

          <FieldGroup>
            <TouchableField grouped={true} onPress={() => {
                this.props.navigation.navigate("ProfileStack")
              }} accessory={true}>
              <View style={styles.profileContainer}>
                {avatar}
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{profile.firstName} {profile.lastName}</Text>
                  <Text style={styles.profileEmail}>{profile.email}</Text>
                </View>
              </View>
            </TouchableField>
            <TouchableField onPress={this._choosePicture.bind(this)} text="Choose Picture" />
            <TouchableField onPress={this._logOut.bind(this)} text="Logout" />
          </FieldGroup>

          <FieldGroup title="Bio">
            <DescriptionField text={profile.bio}>
            </DescriptionField>
          </FieldGroup>

          <FieldGroup title="Instagram">
            <InstagramPhotosField profile="davideweaver" />
            <Field text={profile.instagramUsername} />
          </FieldGroup>

          <FieldGroup title="Tests">
            <TouchableField onPress={this._testError.bind(this)} text="Throw Exception" />
          </FieldGroup>

          <FieldGutter />

        </ScrollView>
      </View>
    );
  }

  _logOut() {
    this.props.authActions.logout(this.props.navigation);
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
      this.props.profileActions.saveAvatar(`data:${image.mime};base64,`+ image.data, image.width, image.height);
    });
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(248, 247, 250)"
  },
  profileContainer: {
    flexDirection: "row",
    marginTop: 2
  },
  profileInfo: {
    marginTop: 4,
    marginLeft: 10
  },
  profileName: {
    fontWeight: "500",
    fontSize: TextSize.normal
  },
  profileEmail: {
    color: "#777",
    fontSize: TextSize.small
  },
  avatar: {
    width: 50, 
    height: 50, 
    resizeMode: "contain", 
    borderRadius: 25
  }
})

function select(state) {
  return {
    profile: state.profile,
    auth: state.auth
  };
}

function actions(dispatch) {
  return {
    profileActions: bindActionCreators(profileActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(select, actions)(ProfileView)