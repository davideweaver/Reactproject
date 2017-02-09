import React, { Component } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as profileActions from "../actions/profileActions"
import ToolbarButton from "../components/toolbarButton"
import ImagePicker from "react-native-image-crop-picker"
import { Card, TouchableCard, CardGutter, MemoCard, InstagramPhotosCard } from '../components/cards';
import Styles, { Color, Dims } from "../styles"

class ProfileView extends Component {

  static navigationOptions = {
    title: "Profile",
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
        <ScrollView>

          <CardGutter />

          <TouchableCard grouped={true} onPress={() => {
              this.props.navigation.navigate("ProfileStack")
            }}>
            <View style={styles.profileContainer}>
              {avatar}
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>David Weaver</Text>
                <Text style={styles.profileEmail}>dave@markkup.com</Text>
              </View>
            </View>
          </TouchableCard>
          <Card>
            <TouchableOpacity onPress={this._choosePicture.bind(this)}>
              <Text style={{color:Color.tint}}>Choose Picture</Text>
            </TouchableOpacity>
          </Card>

          <Card title="Beginning of Card" grouped={true}>
            <Text>This is just text</Text>
          </Card>
          <Card>
            <Text>This is more text</Text>
          </Card>

          <Card title="Tests">
            <TouchableOpacity onPress={this._testError.bind(this)}>
              <Text style={{color:Color.tint}}>Throw Exception</Text>
            </TouchableOpacity>
          </Card>

          <InstagramPhotosCard profile="davideweaver">
          </InstagramPhotosCard>

          <MemoCard text="hshl kdjgh cnjkd flgh jkfhgl ckjsdfhg ksdhfg csdfgdfhsjghskdfjgv kjdfgv kjsdgv hshl kdjgh cnjkd flgh jkfhgl ckjsdfhg ksdhfg csdfgdfhsjghskdfjgv kjdfgv kjsdgv hshl kdjgh cnjkd flgh jkfhgl ckjsdfhg ksdhfg csdfgdfhsjghskdfjgv kjdfgv kjsdgv hshl kdjgh cnjkd flgh jkfhgl ckjsdfhg ksdhfg csdfgdfhsjghskdfjgv kjdfgv kjsdgv hshl kdjgh cnjkd flgh jkfhgl ckjsdfhg ksdhfg csdfgdfhsjghskdfjgv kjdfgv kjsdgv hshl kdjgh cnjkd flgh jkfhgl ckjsdfhg ksdhfg csdfgdfhsjghskdfjgv kjdfgv kjsdgv hshl kdjgh cnjkd flgh jkfhgl ckjsdfhg ksdhfg csdfgdfhsjghskdfjgv kjdfgv kjsdgv hshl kdjgh cnjkd flgh jkfhgl ckjsdfhg ksdhfg csdfgdfhsjghskdfjgv kjdfgv kjsdgv hshl kdjgh cnjkd flgh jkfhgl ckjsdfhg ksdhfg csdfgdfhsjghskdfjgv kjdfgv kjsdgv ">
          </MemoCard>
          
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
      this.props.profileActions.saveImage(`data:${image.mime};base64,`+ image.data, image.width, image.height);
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
  },
  profileInfo: {
    marginTop: 4,
    marginLeft: 10
  },
  profileName: {
    fontWeight: "500"
  },
  profileEmail: {
    color: "#777"
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
    avatar: state.profile.image
  };
}

function actions(dispatch) {
  return {
    profileActions: bindActionCreators(profileActions, dispatch)
  }
}

export default connect(select, actions)(ProfileView)