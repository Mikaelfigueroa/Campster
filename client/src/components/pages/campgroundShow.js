import { BrowserRouter as Router, Route, Link, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { MyContext } from '../myProvider'
import Review from '../review'
import Stars from '../stars'
import Dropdown from '../dropdown'
import DeletePrompt from '../deletePrompt';
import GoogleMapReact from 'google-map-react'
import Bookmark from '../bookmark'


const AnyReactComponent = ({ text }) => <div>{text}</div>


const CampgroundShow = (props) => {
  var history = useHistory()

  const [campground, setCampground] = useState(null)
  const [reviews, setReviews] = useState([])
  const [match, setMatch] = useState(false)
  const [rating, setRating] = useState(null)
  const [type, setType] = useState(null)
  const value = useContext(MyContext)

  useEffect(() => {
    axios.get("/campgrounds/" + props.match.params.campgroundId).then(res => {
      setReviews(res.data.reviews)
      setRating(res.data.campground.rating)
      setCampground(res.data.campground)
      var foundReview = res.data.reviews.find(review => review.user._id == value.state.user._id)
      if (foundReview) {
        setMatch(foundReview)
      }
    })
  }, [value])
  const setPrompt = (params) => {
    value.setLocation("prompt")
    setType(params)
  }

  const setLocation = (params) => {
    value.setLocation("login")
  }
  

  if (campground && value.state.checked) {
    return (
      <div className="campground-show">
        <div className="campground-show-wrapper">
          {value.state.location == "prompt" && type == "review" && match &&
            <DeletePrompt
              url={"/reviews/" + campground._id + "/" + match._id}
              type={type}
              afterFunction={
                (props) => {
                  let arr = reviews.splice(1, reviews.indexOf(reviews.find(review => review._id == match._id)))
                  setMatch(false)
                  setRating(props)
                  setReviews(arr)
                }
              }
            />
          }
          {value.state.location == "prompt" && type == "campground" &&
            <DeletePrompt
              url={"/campgrounds/" + campground._id}
              type={type}
              afterFunction={
                (props) => {
                  history.push("/")
                }
              }
            />
          }
          <div className="campground-cont">
            <img src={campground.image} />
            <div className="campground-cont-wrapper">
              <h1>{campground.name}</h1>
              <span style={{ display: "flex" }}>
                <h2 style={{ paddingRight: "6px", fontWeight: 500 }}> {"$" + campground.cost + " p/n"}</h2>
                {<Stars rating={rating} />}
              </span>
              {value.state.user && <Bookmark campgroundId={campground._id} />}

              { match == false && value.state.user ? 
                <Link to={{ pathname: "/reviews/" + campground._id + "/new" }}>
                  <p style={{width: "100%",padding: "10px 0px" ,boxSizing:"border-box", textAlign: "center", backgroundColor: "#06004d" ,color: "white", marginTop: "20px", marginBottom:"10px"}}>New review</p>
              </Link> : 

                <p onClick={setLocation}  style={{width: "100%",padding: "10px 0px" ,boxSizing:"border-box", textAlign: "center", backgroundColor: "#06004d" ,color: "white", marginTop: "20px", marginBottom:"10px"}}>New review</p>

              }

              
            </div>
          </div>
          <div className="campground-section">
            <div className="reviews-cont">

              {match &&
                <div className="review-match">
                  <div className="review-drop-cont">
                    <Dropdown
                      dropdown={
                        <i class="fas fa-angle-down"></i>
                      }
                      contents={[
                        <Link to={{
                          pathname: "/reviews/" + match.campground + "/edit",
                          state: { review: match }
                        }}>
                          <i className="fas fa-edit"></i>Edit
                        </Link>,
                        <p style={{fontWeight:"600"}} onClick={() => setPrompt("review")}>
                          <i className="fas fa-trash"></i> Delete
                        </p>
                      ]}
                    />
                  </div>
                  <Review review={match} />
                </div>
              }
              {reviews.map(review =>
                <Review key={review._id} review={review} />
              )}
            </div>
            <div className="map">
              <div className="google-map">
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyCRbU0l5b_7AgbrQe26gm8tZTvcVUwvboo' }}
                  defaultCenter={
                    {
                      lat: campground.lat,
                      lng: campground.lng
                    }
                  }
                  defaultZoom={11}
                  yesIWantToUseGoogleMapApiInternals
                >
                  <AnyReactComponent
                    lat={campground.lat}
                    lng={campground.lng}
                    text={campground.location}
                  />
                </GoogleMapReact>
              </div>
              <p>{campground.location}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div></div>
  )
}
export default CampgroundShow
