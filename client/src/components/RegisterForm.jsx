import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  ButtonToolbar } from 'react-bootstrap'



export default class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className="register-div">
        <form className="register-div-form" onSubmit={(e) => {
          e.preventDefault()
          this.props.handleRegister(this.state)
          this.setState({
            username: "",
            email: "",
            password: ""
          })
        }}>
          <h1>Create an account</h1>
          <p>Username</p>
          <input
            name="username"
            id="register-username"
            type="text"

            value={this.state.username}
            onChange={this.handleChange}></input>
          <p>Email</p>
          <input
            name="email"
            id="register-email"
            type="text"

            value={this.state.email}
            onChange={this.handleChange}></input>
          <p>Password</p>
          <input
            name="password"
            id="register-password"
            type="password"

            value={this.state.password}
            onChange={this.handleChange}></input>

          <ButtonToolbar>
            <button>Submit</button>
          </ButtonToolbar>
          <Link id="register-link" to="/login">Already registered?Login</Link>
          <br />
          <p>{this.props.authErrorMessage}</p>
        </form>
      </div>
    )
  }
}


