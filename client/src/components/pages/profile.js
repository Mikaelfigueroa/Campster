import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, useLocation } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../myProvider'
import Stars from '../stars'

const Profile = (props) => {
  const [user, setUser] = useState(null)
  const [reviews, setReviews] = useState([])
  const [avatar, setAvatar] = useState(null)

  const value = useContext(MyContext)

  const callBack = (data) => {
    this.setState({ user: data })
  }

  useEffect(() => {
    console.log(props.props.match.params.userId)
    axios({
      url: "/profile/" + props.props.match.params.userId,
      method: "GET",
    }).then(res => {

      setUser(res.data.user)
      setReviews(res.data.reviews)
      setAvatar(res.data.user.avatar)
      console.log(res.data)
      console.log(value)
    })
  }, [])

  if (value.state.checked && value.state.user == false) {
    return <Redirect to={"/"} />
  }


  return (
    <div className="profile-page">

      <div className="profile-header ">
        <img src={avatar} alt="" />


        <div>
          <p className="profile-username"></p>
          <p><i class="fas fa-star"></i>{"  " + reviews.length + " " + "reviews"}</p>
        </div>

        {user && value.state.user && value.state.user._id == user._id &&
          <Link to="/profile/edit">
            <i class="fas fa-edit"></i> Edit Profile
              </Link>
        }



      </div>

      <div className="reviews wrapper">
        <h1>Reviews</h1>


        {reviews.map(review =>
          <div className="review">
            <div className="review-cont">
              <img src={review.campground.image} alt="" />
              <div className="review-text-cont">
                <Link to={"/campgrounds/" + review.campground._id}>
                  <p>{review.campground.name}</p>
                </Link>
                <p className="date" >{new Date(review.createdAt).toDateString()}</p>
                <Stars rating={review.rating} />
              </div>
            </div>
            <p class="review-text">{review.text}</p>
          </div>
        )}
      </div>


    </div>
  );
}








export default Profile
