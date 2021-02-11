import Axios from 'axios'
import React, { Component, useEffect } from 'react'
import {
  BrowserRouter as Router, Route, Link, Redirect, useHistory,
} from 'react-router-dom'
import { MyContext } from "../myProvider";
import { useLocation } from 'react-router-dom'
import Search from '../search';
import { useState } from 'react';
import Stars from '../stars'

const Landing = (props) => {
  const [campgrounds, setCampgrounds] = useState([])

  useEffect(() => {
    Axios({
      url: "/campgrounds"
    }).then(res => {
      res.data.splice(6,res.data.length)
      setCampgrounds(res.data)
    })
  }, [])

  return (
    <div className="landingpage">
      <div className="landing-image-cont">
        <img className="landing-image" src="https://res.cloudinary.com/dbjw5nvs2/image/upload/v1604524762/hugues-de-buyer-mimeure-hGuGRayJrv0-unsplash_tmezje.jpg" />
        <div className="landing-overlay">
          <h2>Find campgrounds. Review campgrounds.  <br /> Adventure through nature</h2>
          <Search />
        </div>
      </div>



      <div className="wrapper">
        <p style={{ textAlign: "center", padding: "30px 0px", fontSize: "24px", fontWeight: 600 }}>New campgrounds</p>
        <div className="landing-campground-cont">
          {campgrounds.map(campground =>
            <div className="landing-campground">
              <img src={campground.image} alt="" />
              <Link to={"campgrounds/" + campground._id}>
                <p>{campground.name}</p>
              </Link>
              <p>{campground.location}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}






export default Landing;