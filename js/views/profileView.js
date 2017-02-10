import React, { Component } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as profileActions from "../actions/profileActions"
import ToolbarButton from "../components/toolbarButton"
import ImagePicker from "react-native-image-crop-picker"
import { Card, CardGroup, TouchableCard, CardGutter, MemoCard, InstagramPhotosCard } from '../components/cards';
import Styles, { Color, Dims, TextSize } from "../styles"

class ProfileView extends Component {

  static navigationOptions = {
    title: "Profile",
    header: ({goBack}) => ({
      right: (
        <TouchableOpacity onPress={() => goBack(null)}>
          <Text style={Styles.navbarButtonText}>Done</Text>
        </TouchableOpacity>
        ),
        style: {backgroundColor: "white"}
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

          <CardGroup>
            <TouchableCard grouped={true} onPress={() => {
                this.props.navigation.navigate("ProfileStack")
              }} accessory={true}>
              <View style={styles.profileContainer}>
                {avatar}
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{profile.firstName} {profile.lastName}</Text>
                  <Text style={styles.profileEmail}>{profile.email}</Text>
                </View>
              </View>
            </TouchableCard>
            <TouchableCard onPress={this._choosePicture.bind(this)} text="Choose Picture" />
          </CardGroup>

          <CardGroup title="Bio">
            <MemoCard text={profile.bio}>
            </MemoCard>
          </CardGroup>

          <CardGroup title="Instagram">
            <InstagramPhotosCard profile="davideweaver" />
            <Card text={profile.instagramUsername} />
          </CardGroup>

          <CardGroup title="Tests">
            <TouchableCard onPress={this._testError.bind(this)} text="Throw Exception" />
          </CardGroup>

          <CardGutter />

        </ScrollView>
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
    profile: state.profile
  };
}

function actions(dispatch) {
  return {
    profileActions: bindActionCreators(profileActions, dispatch)
  }
}

export default connect(select, actions)(ProfileView)