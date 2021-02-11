import Axios from 'axios'
import React, { useContext } from 'react'
import moduleName from './resetLocation'
import { MyContext } from './myProvider'
import ResetLocation from './resetLocation'

const DeletePrompt = (props) => {
    const value = useContext(MyContext)
    const handdleClick = (params) => {
        Axios({
            method: "DELETE",
            url: props.url
        }).then(res => {
            props.afterFunction(res.data)
        })
    }
    return (
        <div className="prompt">
            <div className="prompt-cont">
                <p>{"are you sure you want to delete this " + props.type + "?"}</p>
                <div>
                    <ResetLocation icon={"Cancel"} />
                    <button className="delete" onClick={handdleClick}>Delete</button>
                </div>
            </div>
        </div>
    )
}


export default DeletePrompt