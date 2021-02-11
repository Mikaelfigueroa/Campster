import React, { createContext, Component, useState, useEffect } from 'react'
import Axios from 'axios';
export const MyContext = createContext();  //exporting context object



const MyProvider = (props) => {
  
  const [user, setUser] = useState(false)
  const [checked, setChecked] = useState(false)
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(null)

  Axios.defaults.withCredentials = true;
  Axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT
    
  useEffect(() => {
    Axios({
      method: "GET",
      url: "/isloggedin"
    }).then(res => {
      setUser(res.data)
      setChecked(true)
    })
  }, [])

  return (
    <MyContext.Provider value={
      {
        state: {
          user: user,
          checked: checked,
          location: location,
          loading: loading
        },
        setUser: (value) => { setUser(value) },
        setLocation: (value) => { setLocation(value) }
      }
    }>
      {props.children}
    </MyContext.Provider>
  )

}

export default MyProvider;
