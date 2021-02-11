import React, { Component, useContext } from 'react'
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom'

import { MyContext } from "./myProvider"
import Search from "./search"
import Logout from "./logout"
import Dropdown from './dropdown'

const Header = (props) => {
    const value = useContext(MyContext)
    const location = useLocation()

    const handleClick = (params) => {
        value.setLocation("login")
    }

    const toggleSearch = (props) => {
        document.getElementById("mobile-drop").classList.toggle("show-drop")
    }
    
    return (
        <div className="header-wrapper">
            <div className="header">


                <Link to="/" >
                    <p className="logo">
                        Campster
                    </p>
                </Link>


                {location.pathname != "/" && <Search />}
                <div id="header-side">


                    <button id="mobile-search-cont" onClick={toggleSearch}>
                        <i id="mobile-search" class="fas fa-search" aria-hidden="true"></i>
                    </button>




                    {value.state.user ?
                        <Dropdown
                            dropdown={
                                <img src={value.state.user.avatar} alt="" className="profile-logo" />
                            }
                            contents={[

                                <Link to={{ pathname: "/profile/" + value.state.user._id }}>
                                    <span>
                                        <i class="fas fa-user"></i>
                                        <p>Profile</p>
                                    </span>
                                </Link>,
                                <Link to={"/bookmarks"}>
                                    <span>
                                        <i class="fas fa-bookmark"></i>
                                        <p>Bookmarks</p>
                                    </span>

                                </Link>,

                                <Link to={"/campgrounds/new"}>
                                    <span>
                                        <i class="fas fa-plus"></i>
                                        <p>Campground</p>
                                    </span>
                                </Link>,

                                <Logout />
                            ]}
                        /> :
                        <button className="login-btn" onClick={handleClick}>Log in</button>

                    }
                </div>

            </div>


            <div id="mobile-drop" style={{display:"none"}}>
                <button id="mobile-search-cross"  onClick={toggleSearch}>
                    <i class="fas fa-times"></i>
                </button>
                <Search />
            </div>


            
        </div>

    )

}

export default Header
