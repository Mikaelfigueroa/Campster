import Axios from 'axios'
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    useLocation,
    Redirect,
    useHistory
} from "react-router-dom";

const Search = props => {
    let history = useHistory()
    const [redirect, setRedirect] = useState(0)

    function useHandleSubmit(e) {
        e.preventDefault()
        if(e.target.children[1].value.length > 0){
            history.push("/campgrounds/search/" + e.target.children[1].value)
            e.target.reset()
        }
    }


    return (
        <div className="search-container">
            <form className="search-form"  onSubmit={useHandleSubmit}>
                <i className="fas fa-search"></i>
                <input className="search" id="search" type="text" name="search" placeholder="search..." />
            </form>
        </div>
    )

}

export default Search
