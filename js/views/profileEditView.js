import React, { Component } from "react"
import { StyleSheet, View, ScrollView, Text } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { CardStack } from "react-navigation"
import { Form, Separator, InputField, LinkField, KeyboardAwareScrollViewXX,
  SwitchField, PickerField, DatePickerField, TimePickerField } from "react-native-form-generator"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import * as profileActions from "../actions/profileActions"
import Styles, { Color, Dims, TextSize } from "../styles"

const BackButton = CardStack.Header.BackButton;

class ProfileEditView extends Component {

  static navigationOptions = {
    title: "Edit Profile",
    header: ({goBack}) => ({
      left: (
        <BackButton
          onPress={() => goBack(null)}
          title="Profile"
          />
        ),
        style: {backgroundColor: "white"}
    })
  }

  constructor(props){
    super(props);
    this.state = {
      formData: {}
    }
  }

  handleFormChange(formData){
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
    first_name:"",
    last_name:"",
    gender: '',
    birthday: Date,
    has_accepted_conditions: bool
    }
    */

    //this.setState({formData:formData})
    //this.props.onFormChange && this.props.onFormChange(formData);

    this.props.profileActions.saveDetails(formData.firstName, formData.lastName, formData.email, formData.gender, formData.bio, formData.instagramUsername)
  }

  handleFormFocus(e, component){
    //console.log(e, component);
  }

  openTermsAndConditionsURL(){

  }

  render() {
    const profile = this.props.profile;

    return (<KeyboardAwareScrollView  style={Styles.cardContainer}>

      <Form
        ref='registrationForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Personal Information">

        <Separator containerStyle={{paddingTop: 15}} />
        <InputField
          ref="firstName"
          value={profile.firstName}
          label='First Name'
          helpText={((self)=>{
            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.registrationForm.refs.firstName.valid){
                return self.refs.registrationForm.refs.firstName.validationErrors.join("\n");
              }

            }
          })(this)}
          validationFunction={[(value)=>{
          
            //you can have multiple validators in a single function or an array of functions

            if(value == '') return "Required";
            //Initial state is null/undefined
            if(!value) return true;
            // Check if First Name Contains Numbers
            var matches = value.match(/\d+/g);
            if (matches != null) {
                return "First Name can't contain numbers";
            }

            return true;
          }, (value)=>{
            ///Initial state is null/undefined
            if(!value) return true;
            if(value.indexOf('4')!=-1){
              return "I can't stand number 4";
            }
            return true;
          }]}
          />
        <InputField ref="lastName" label="Last Name" value={profile.lastName} />
        <InputField ref="email" label="Email" value={profile.email} />
        <PickerField ref="gender" value={profile.gender}
          label='Gender'
          options={{
            "": '',
            male: 'Male',
            female: 'Female'
          }}/>

        <Separator />

        <InputField multiline={true} ref="bio" placeholder="Bio" value={profile.bio} />

        <Separator label="Instagram" />

        <InputField ref="instagramUsername" label="Instagram Id" value={profile.instagramUsername}
          helpText="This will allow us to show some of your pictures"
          />

      </Form>

    </KeyboardAwareScrollView>);
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

export default connect(select, actions)(ProfileEditView)