import React from 'react';
import { showPosts, registerUser, loginUser, verifyUser } from './services/api-helper'
import { Route, Link, withRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostContainer from './components/PostContainer'
import './App.css';
import {Button,ButtonToolbar} from 'react-bootstrap'



class App extends React.Component {
  state = {
    currentUser: null,
    username: "",
    email: "",
    password: ""
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleRegister = async (registerData) => {
    const currentUser = await registerUser(registerData)
    if (currentUser.error) {
      this.setState({ authErrorMessage: currentUser.error })
    } else {
      this.setState({ currentUser })
      this.props.history.push("/posts")
    }
  }

  handleLogin = async (loginData) => {
    const currentUser = await loginUser(loginData);
    this.setState({ currentUser })
    this.props.history.push("/posts")
  }

  handleVerify = async () => {
    const currentUser = await verifyUser();
    console.log(currentUser)
    if (currentUser === false) {
      this.props.history.push("/login")
    } else {
      this.setState({ currentUser })
      this.props.history.push(this.props.location.pathname)
    }

    ///token

  }

  handleLogout = () => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('authToken')
  }

  componentDidMount() {
    this.handleVerify()
  }


  render() {
   


    return (
      <div className="App">

        <main>
          <>
            {
              this.state.currentUser ?
                <div id="user-info">
                  <p id="userheader">{`Hello, ${this.state.currentUser.username}`}</p>
                  <Link to='/register'>
                    <ButtonToolbar>
                      <Button variant="outline-primary" onClick={this.handleLogout}>Logout</Button> 
                    </ButtonToolbar>
                  </Link>

                </div>
                :
                false
            }
          </>
          <Route path='/login' render={() => (
            <LoginForm
              handleLogin={this.handleLogin}
              authErrorMessage={this.state.authErrorMessage}
            />
          )} />
          <Route path='/register' render={() => (
            <RegisterForm
              handleRegister={this.handleRegister}
              authErrorMessage={this.state.authErrorMessage}
            />
          )} />

          <PostContainer currentUser={this.state.currentUser} />
        </main>

      </div>
    );
  }
}

export default withRouter(App);
