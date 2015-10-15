'use strict';
var React = require('react');
var Joi = require('joi');
var JoiValidationStrategy 
    = require('joi-validation-strategy');
var ReactValidationMixin
    = require('react-validation-mixin');

var ValidatedInput = React.createClass({
    renderHelpText: function(message) {
        return (
            <span className='help-block'>
                {message}
            </span>
        );
    },
    render: function() {
        var error 
            = this.props.getValidationMessages(
                this.props.name);

        var formClass = "form-group";

        if (error.length > 0) {
            formClass = formClass + " has-error";
        }

        return (
            <div className={formClass}>
                <label className="control-label" 
                    for={this.props.name}>
                    {this.props.label}
                </label>
                <input className="form-control" 
                    {...this.props}/>
                {this.renderHelpText(error)}
            </div>
        );
    }
});

var Demo = React.createClass({
  validatorTypes: {
    userName: Joi.string().required()
        .label('User Name'),
    password: Joi.string().required()
        .regex(/[a-zA-Z0-9]{3,30}/)
        .label('Password')
  },
  getValidatorData: function() {
    return this.state;
  },
  getInitialState: function() {
    return {
      userName: "",
      password: ""
    };
  },
  onSubmit(event) {
    event.preventDefault();

    // To allow accessing this in the scope of a callback
    var self = this;

    // Handle field level validations
    var onValidate = function(error) {

        if (error) {
            if (error.userName) {
                alert(error.userName);
            }

            if (error.password) {
                alert(error.password);
            }
        }

        // Handle form level validations
        var userNameContainsPassword 
            = self.state.password.indexOf(
                self.state.userName) > -1;

        if (self.state.userName 
            && userNameContainsPassword) {
            alert("Password cannot contain the user name.");
            return;
        }

        if (!error) {
            alert("Account created!");
        }
    };

    this.props.validate(onValidate);
  },
  onChange: function(event) {
    var state = {};

    state[event.target.name] = event.target.value;
    
    this.setState(state);
  },
  render: function() {
    return (
        <div className="container">
            <form onSubmit={this.onSubmit.bind(this)}>
                <ValidatedInput 
                    name="userName"
                    type="text" 
                    ref="userName" 
                    placeholder="Enter User Name" 
                    label="User Name"
                    value={this.state.userName}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.props.handleValidation('userName')}
                    getValidationMessages=
                        {this.props.getValidationMessages}/>
                <ValidatedInput 
                    name="password"
                    className="form-control"
                    type="text" 
                    ref="password" 
                    placeholder="Enter Password" 
                    label="Password"
                    value={this.state.password}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.props.handleValidation('password')}
                    getValidationMessages=
                        {this.props.getValidationMessages}/>
                <button className="btn btn-success" type="submit">
                    Submit
                </button>
            </form>
        </div>
        ); 
  }
});

// Decorate our component with validations support
var ValidationDemo 
    = ReactValidationMixin(JoiValidationStrategy)(Demo);

React.render(
    <ValidationDemo/>,
    document.getElementById('view'));