import React, { Component, PropTypes } from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import { Form, Separator, InputField, LinkField, KeyboardAwareScrollView,
  SwitchField, PickerField, DatePickerField, TimePickerField,
  Field, FieldGroup, TouchableField, FieldGutter, DescriptionField } from "react-native-fields"

export default class LoginForm extends Component {

  static propTypes = {
    formType: PropTypes.string,
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func
  }

  static defaultProps = {
    name: "Template"
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<KeyboardAwareScrollView  style={styles.container}>

      <Form
        ref="registrationForm"
        onFocus={this._handleFormFocus.bind(this)}
        onChange={this._handleFormChange.bind(this)}>

        <Separator />

        <InputField 
          ref="email" 
          returnKeyType="next"
          placeholder="Email Address"
          keyboardType="email-address"
          onSubmitEditing={(event) => this.refs.registrationForm.refs.password.focus()}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
        />

        <InputField 
          ref="password" 
          placeholder="Password"
          returnKeyType="go" 
          onSubmitEditing={(event) => this.refs.registrationForm.refs.email.focus()} 
        />

        

      </Form>

    </KeyboardAwareScrollView>)
  }

  _handleFormChange(formData){
    if (this.props.onChange)
      this.props.onChange(formData);
  }

  _handleFormFocus(e, component){
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
