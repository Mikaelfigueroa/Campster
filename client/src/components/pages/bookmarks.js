import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { MyContext } from '../myProvider'
import Stars from '../stars'

const Bookmarks = (props) => {
    const [bookmarks, setBookmarks] = useState([])
    const value = useContext(MyContext)


    useEffect(() => {
        Axios({
            url: "/bookmarks"
        }).then(res => {
            console.log(res.data)
            setBookmarks(res.data)
        })
    }, [])

    if(value.state.checked && value.state.user == false){
        console.log("redirect trig")
        return <Redirect to={"/"} />
      }


    return (
        <div className="bookmarks">
            <div className="wrapper">
                <div className="landing-campground-cont">
                    {bookmarks.map(campground =>
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


export default Bookmarks