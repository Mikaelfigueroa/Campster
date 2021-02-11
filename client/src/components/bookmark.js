import Axios from 'axios'
import React, { useState, useEffect } from 'react'

const Bookmark = (props) => {
    const [bookmarked, setBookmarked] = useState(false)

    const handleClick = (params) => {
        Axios({
            method: "post",
            url: "/bookmarks/" + props.campgroundId
        }).then( res => {
            if(bookmarked){
                setBookmarked(false)
            }
            else{
                setBookmarked(true)
            }
        })
    }
     

    useEffect(() => {
        Axios({
            url: "/bookmarks"
        }).then( res =>{
            var found = res.data.find( bookmark => bookmark._id == props.campgroundId)
            console.log(res.data)
            if(found){
                setBookmarked(true)
                console.log("found")
            }
        })
    }, [])


    return(
        <button id="bookmarkBtn" onClick={handleClick}>
            {bookmarked == true ? <i class="fas fa-bookmark"></i> : <i class="far fa-bookmark"></i>}
            Save</button>
    )
}
export default Bookmark
