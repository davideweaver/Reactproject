import React, { Component } from "react"
import { StyleSheet, View, Button, Text } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { CardStack } from "react-navigation"
import * as authActions from "../state/actions"
import LoginRender from '../components/LoginRender'

class LoginView extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    // TODO
    //if (nextProps.auth.form.isValid == true) {
    //  this.props.navigation.navigate("Tabs");
    //}
  }

  render () {
    let onButtonPress = this._buttonPressHandler.bind(null,
                          this.props.authActions.login,
                          this.props.auth.form.fields.email,
                          this.props.auth.form.fields.password,
                          this.props.navigation
                        )

    return (
      <LoginRender
        formType={"LOGIN"}
        loginButtonText="Login"
        onButtonPress={onButtonPress}
        displayPasswordCheckbox
        leftMessageType={"REGISTER"}
        rightMessageType={"FORGOT_PASSWORD"}
        auth={this.props.auth}
      />
    )
  }

  _buttonPressHandler (login, username, password, navigation) {
    login(username, password, navigation)
  }
}

let styles = StyleSheet.create({
})

function select(state) {
  return {
    auth: state.auth
  };
}

function actions(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(select, actions)(LoginView)