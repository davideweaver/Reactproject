import React, { Component } from "react"
import { StyleSheet, View, ScrollView, Text } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { CardStack } from "react-navigation"

import { Form, Separator, InputField, LinkField, KeyboardAwareScrollView,
  SwitchField, PickerField, DatePickerField, TimePickerField,
  Field, FieldGroup, TouchableField, FieldGutter, DescriptionField } from "react-native-fields"

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
        style: Styles.navbar
    })
  }

  constructor(props){
    super(props);
    this.state = {
      formData: {}
    }
  }

  render() {
    const profile = this.props.profile;

    return (<KeyboardAwareScrollView  style={Styles.cardContainer}>

      <Form
        ref='registrationForm'
        onFocus={this._handleFormFocus.bind(this)}
        onChange={this._handleFormChange.bind(this)}>

        <Separator />

        <InputField
          ref="firstName"
          value={profile.firstName}
          label="First Name"
          returnKeyType="next"
          onSubmitEditing={(event) => this.refs.registrationForm.refs.lastName.focus()}
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

        <InputField 
          ref="lastName" 
          label="Last Name"
          returnKeyType="next" 
          onSubmitEditing={(event) => this.refs.registrationForm.refs.email.focus()}
          value={profile.lastName} />

        <InputField 
          ref="email" 
          label="Email" 
          returnKeyType="next"
          keyboardType="email-address"
          onSubmitEditing={(event) => this.refs.registrationForm.refs.gender.focus()}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          value={profile.email} 
        />

        <PickerField 
          ref="gender" 
          value={profile.gender}
          label="Gender"
          returnKeyType="next"
          onSubmitEditing={(event) => this.refs.registrationForm.refs.bio.focus()}
          options={{
            "": '',
            male: 'Male',
            female: 'Female'
          }}/>

        <Separator />

        <InputField 
          multiline={true} 
          ref="bio" 
          placeholder="Bio" 
          returnKeyType="next"
          onSubmitEditing={(event) => this.refs.registrationForm.refs.instagramUsername.focus()}
          value={profile.bio} 
          style={{minHeight:130}} />

        <Separator label="Instagram" />

        <InputField 
          ref="instagramUsername" 
          label="Username" 
          value={profile.instagramUsername}
          returnKeyType="done"
          onSubmitEditing={(event) => {}}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          helpText="This will allow us to show some of your pictures"
          />

      </Form>

    </KeyboardAwareScrollView>);
  }

  _handleFormChange(formData){
    this.props.profileActions.saveDetails(formData.firstName, formData.lastName, formData.email, formData.gender, formData.bio, formData.instagramUsername)
  }

  _handleFormFocus(e, component){
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