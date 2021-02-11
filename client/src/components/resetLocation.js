import React, { useContext } from 'react'
import { MyContext } from './myProvider'

const ResetLocation = (props) => {
    const value = useContext(MyContext)

    const handleClick = (params) => {
        value.setLocation(null)
    }
    return (
        <button className="reset-location" onClick={handleClick}>
            {props.icon}

        </button>
    )

}

export default ResetLocation