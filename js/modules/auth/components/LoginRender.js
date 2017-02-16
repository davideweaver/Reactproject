import React, { Component, PropTypes } from "react"
import { StyleSheet, ScrollView, View, Text, TouchableHighlight } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as authActions from "../state/actions"
import LoginForm from "./LoginForm"
import Header from "./Header"
import FormButton from "./FormButton"
import Dimensions from "Dimensions"

// Screen dimensions in current orientation
var {height, width} = Dimensions.get("window") 

class LoginRender extends Component {

  static propTypes = {
    name: PropTypes.string
  }

  static defaultProps = {
    name: "Template"
  }

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: this.props.auth.form.fields.username,
        email: this.props.auth.form.fields.email,
        password: this.props.auth.form.fields.password,
        passwordAgain: this.props.auth.form.fields.passwordAgain
      }
    }
  }

  render () {

    var formType = this.props.formType
    var loginButtonText = this.props.loginButtonText
    var onButtonPress = this.props.onButtonPress
    var displayPasswordCheckbox = this.props.displayPasswordCheckbox
    var leftMessageType = this.props.leftMessageType
    var rightMessageType = this.props.rightMessageType

    var passwordCheckbox = <Text />
    let leftMessage = null; //this.getMessage(leftMessageType, this.props.actions)
    let rightMessage = null; //this.getMessage(rightMessageType, this.props.actions)

    // display the login / register / change password screens
    //this.errorAlert.checkError(this.props.auth.form.error)

    // Toggle the display of the Password and PasswordAgain fields
    /*if (displayPasswordCheckbox) {
      passwordCheckbox =
        <ItemCheckbox
          text={I18n.t('LoginRender.show_password')}
          disabled={this.props.auth.form.isFetching}
          onCheck={() => {
            this.props.actions.onAuthFormFieldChange('showPassword', true)
          }}
          onUncheck={() => {
            this.props.actions.onAuthFormFieldChange('showPassword', false)
          }}
      />
    }*/

    /**
     * The LoginForm is now defined with the required fields.  Just
     * surround it with the Header and the navigation messages
     * Note how the button too is disabled if we're fetching. The
     * header props are mostly for support of Hot reloading.
     * See the docs for Header for more info.
     */

    return (
      <View style={styles.container}>
        <ScrollView horizontal={false} width={width} height={height}>
          <View>
            <Header isFetching={this.props.auth.form.isFetching} />

            <View style={styles.inputs}>
              <LoginForm
                formType={formType}
                form={this.props.auth.form}
                value={this.state.value}
                onChange={this._onChange.bind(this)} />
              {passwordCheckbox}
            </View>

            <FormButton
              isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
              onPress={onButtonPress}
              buttonText={loginButtonText} />

            <View >
              <View style={styles.forgotContainer}>
                {leftMessage}
                {rightMessage}
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    )
  }

  /**
   * ### _onChange
   *
   * As the user enters keys, this is called for each key stroke.
   * Rather then publish the rules for each of the fields, I find it
   * better to display the rules required as long as the field doesn't
   * meet the requirements.
   * *Note* that the fields are validated by the authReducer
   */
  _onChange (value) {
    if (value.username !== '') {
      this.props.actions.onAuthFormFieldChange('username', value.username)
    }
    if (value.email !== '') {
      this.props.actions.onAuthFormFieldChange('email', value.email)
    }
    if (value.password !== '') {
      this.props.actions.onAuthFormFieldChange('password', value.password)
    }
    if (value.passwordAgain !== '') {
      this.props.actions.onAuthFormFieldChange('passwordAgain', value.passwordAgain)
    }
    this.setState(
      {value}
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  }
})

function select(state) {
  return {
  };
}

function actions(dispatch) {
  return {
      actions: bindActionCreators({ ...authActions }, dispatch)
  }
}

export default connect(select, actions)(LoginRender)