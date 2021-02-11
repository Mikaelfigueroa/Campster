import Axios from 'axios';
import { Route, Switch, NavLink, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Stars from '../stars'

const CampgroundIndex = (props) => {
    const [redirect, setRedirect] = useState(null)
    const [campgrounds, setCampgrounds] = useState([])


    useEffect(() => {
        Axios({
            method: "POST",
            data: {
                search: props.props.match.params.search
            },
            url: "/campgrounds/search"
        }).then(res => {
            setCampgrounds(res.data)
        })
    }, [])


    return (
        <div id="campground-index">
            <p id="search-count">{campgrounds.length + " " + "results found"} </p>



            <div className="wrapper">
                <div className="landing-campground-cont">
                    {campgrounds.map(campground =>
                        <div className="landing-campground">
                            <img src={campground.image} alt="" />
                            <Link to={"/campgrounds/" + campground._id}>
                                <p>{campground.name}</p>
                            </Link>
                            <Stars rating={campground.rating}/>
                            <p>{campground.location}</p>
                        </div>
                    )}
                </div>
            </div>




        </div>
    )
}



export default CampgroundIndex