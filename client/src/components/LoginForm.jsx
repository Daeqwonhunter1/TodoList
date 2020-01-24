import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  ButtonToolbar } from 'react-bootstrap'


export default class LoginForm extends Component {
  state = {

    email: "",
    password: ""
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className="login-div">
        <form className="login-div-form" onSubmit={(e) => {
          e.preventDefault();
          this.props.handleLogin(this.state)
          this.setState({
            email: "",
            password: ""
          })
        }}>

          <h1>Login</h1>
          <p>Email</p>
          <input
            name="email"
            id="login-email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}></input>
          <p>Password</p>
          <input
            name="password"
            id="login-password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}></input>

          <ButtonToolbar>
            <button>Submit</button>
          </ButtonToolbar>
          <Link id="register-link" to="/register">Not registered? Register here.</Link>
          <br />

        </form>
      </div>
    )
  }
}