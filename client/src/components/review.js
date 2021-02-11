import React, { useState, useEffect, useContext } from 'react'
import { Route, Switch, NavLink, Link } from 'react-router-dom'
import { MyContext } from "./myProvider"
import Stars from './stars'


var Review = (props) => {
    const value = useContext(MyContext)
    var date = new Date(props.review.createdAt).toDateString()
    
    const stars = []
    var className  = "star" + props.review.rating + " fas fa-star"
    for (var i = 0; i < props.review.rating; i++) {
        stars.push(<i className={className}></i>)
    }

    return (
        <div className="review">
            <div className="review-cont">
                <img src={props.review.user.avatar} alt="" />
                <div className="review-text-cont">
                    <Link to={{ pathname: '/profile/' + props.review.user._id }}>
                        
                        <span>           
                            <p style={{display:"inline-block"}}>{props.review.user.username}</p>

                            <p style={{display:"inline-block",paddingLeft: "4px", fontWeight: 500, color:"#474747" }}>{props.review.user.reviewCount + " Review"}</p>
                        </span>
                    </Link>

                    <p className="date" >{new Date(props.review.createdAt).toDateString()}</p>
                    <Stars rating={props.review.rating} />
               
                </div>

            </div>

            <p className="review-text">{props.review.text}</p>
        </div>
    )

}

export default Review
