'use strict';
var React = require('react');
var Joi = require('joi');
var JoiValidationStrategy = require('joi-validation-strategy');
var ReactValidationMixin = require('react-validation-mixin');

var Demo = React.createClass({
  validatorTypes: {
    userName: Joi.string().required().label('User Name'),
    password: Joi.string().required().regex(/[a-zA-Z0-9]{3,30}/).label('Password')
  },
  getValidatorData: function() {
    return this.state;
  },
  getInitialState: function() {
    return {
      userName: null,
      password: null
    };
  },
  render: function() {
    return (
        <form onSubmit={this.onSubmit}>
            <input 
                name="userName"
                className="form-control"
                type="text" 
                ref="userName" 
                placeholder="Enter User Name" 
                value={this.state.userName}
                onChange={this.onChange}
                onBlur={this.props.handleValidation('userName')}/>
            {this.renderHelpText(this.props.getValidationMessages('userName'))}
            <input 
                name="password"
                className="form-control"
                type="text" 
                ref="password" 
                placeholder="Enter Password" 
                value={this.state.password}
                onChange={this.onChange.bind(this)}
                onBlur={this.props.handleValidation('password')}/>
            {this.renderHelpText(this.props.getValidationMessages('password'))}
            <button className='btn btn-success' type='submit'>Submit</button>
        </form>
        ); 
  },
  onSubmit(event) {
    event.preventDefault();
    var onValidate = function(error) {
      if (error) {
        //form has errors; do not submit
        if (error.userName) {
            alert(error.userName);
        }

        if (error.password) {
            alert(error.password);
        }
        
      } else {
        //no errors; submit form
        alert('no error');
      }
    };
    this.props.validate(onValidate);
  },
  renderHelpText: function(message) {
    return (
            <span className='help-block'>
                {message}
            </span>
        );
  },
  onChange: function(event) {
    var state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }    
});

var ValidationDemo = ReactValidationMixin(JoiValidationStrategy)(Demo);;

React.render(
    <ValidationDemo/>,
    document.getElementById('view'));