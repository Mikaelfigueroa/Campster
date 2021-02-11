import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import "./main.css"
import Header from "./components/header"

import configs from "./configs"
import MyProvider from "./components/myProvider"
import Landing from "./components/pages/landing"

import Login from "./components/login"
import Register from "./components/register"
import Loading from './components/loading'

import Profile from "./components/pages/profile"
import ProfileEdit from "./components/pages/profileEdit"

import CampgroundShow from "./components/pages/campgroundShow"
import CampgroundIndex from "./components/pages/campgroundIndex"
import CampgroundNew from "./components/pages/campgroundNew"
import CampgroundEdit from './components/pages/campgroundEdit'

import ReviewEdit from "./components/pages/reviewEdit"
import ReviewNew from "./components/pages/reviewNew"

import Bookmarks from "./components/pages/bookmarks";
import { MyContext } from './components/myProvider'


class App extends React.Component {
  render() {
    return (
      <MyProvider>
        <MyContext.Consumer>
          {value =>
            <div className="App">
              {value.state.location == "login" && <Login />}
              {value.state.location == "register" && <Register />}
              <Router>
                <Header />
                <Switch>

                  <Route path="/" exact component={Landing} />


                  <Route path="/profile/edit" exact component={ProfileEdit} />
                  <Route path="/profile/:userId" component={(props) => <Profile props={props} keyProp={"profile"} key={Math.random()} />} />
                  <Route path="/bookmarks" exact component={Bookmarks} />

                  <Route path="/campgrounds/search/:search" component={(props) => <CampgroundIndex props={props} keyProp={"campgroundindex"} key={Math.random()} />} />
                  <Route path="/campgrounds/new" exact component={CampgroundNew} />
                  <Route path="/campgrounds/:campgroundId/edit" exact component={CampgroundEdit} />
                  <Route path="/campgrounds/:campgroundId" exact component={CampgroundShow} />

                  <Route path="/reviews/:campgroundId/new" exact component={ReviewNew} />
                  <Route path="/reviews/:reviewId/edit" exact component={ReviewEdit} />

                </Switch>
              </Router>
            </div>
          }
          </MyContext.Consumer>

           
          




      </MyProvider>
    )
  }
}
export default App;
