
import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, useState, useEffect } from 'react-router-dom'
import axios from 'axios';
import { MyContext } from "./myProvider"
import ResetLocation from './resetLocation'

class Login extends React.Component {


  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      redirect: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }



  handleSubmit(event) {
    let value = this.context;
    event.preventDefault();

    axios.post("/login",
      {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      }).then(res => {
        let value = this.context;
        value.setUser(res.data)
        value.setLocation(null)
        this.setState({ redirect: "/" })
      }
      ).catch(err => {
        this.setState({ error: err.response.data })
      });


    event.target.reset()

  }

  handleClick = (params) => {
    let value = this.context
    value.setLocation("register")
  }


  render() {
    let value = this.context;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="login">
        <div className="user-control-form">
          {this.state.error && <p className="error">{this.state.error}</p>}
          <ResetLocation icon={<i className="fas fa-times"></i>} />
          <h1 class="textcenter">Login</h1>
          <form className="user-form" onSubmit={this.handleSubmit}>
            <input id="username" name="username" type="string" placeholder="Username" />
            <input id="password" name="password" type="password" placeholder="Password" />
            <input type="submit" value="Login" />
          </form>
          <p>Don't have a account? <button onClick={this.handleClick}>register</button></p>
        </div>
      </div>

    )
  }
}

export default Login;
