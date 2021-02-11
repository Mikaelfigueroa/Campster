import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Route, Switch, NavLink, Link, useHistory } from 'react-router-dom'

const CanpgroundEdit = (props) => {
    const [campground, setCampground] = useState(props.location.state.campground)
    const [desc, setDesc] = useState(props.location.state.campground.desc)
    const [file, setFile] = useState(null)
    const [cost, setCost] = useState(props.location.state.campground.cost)
    var history = useHistory()
    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData();
        if (file) {
            var imageFile = document.querySelector('#imageinput');
            formData.append("image", imageFile.files[0]);
        }

        formData.append("desc", desc)
        formData.append("cost", cost)

        console.log(cost)
        Axios({
            url: "/campgrounds/" + campground._id,
            method: "PUT",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            history.goBack()
        })
    }
    const handleChangeDesc = (params) => {
        setDesc(params.target.value)
    }
    const handleChangeCost = (params) => {
        setCost(params.target.value)
    }
    const imagePreview = (event) => {
        if (event.target.files[0]) {
            setFile(URL.createObjectURL(event.target.files[0]))
        }
    }
    return (
        <div>
            <img id="imagepreview" src={file} />
            <label className="image-label" for="imageinput">Update campground image</label>
            <input onInput={imagePreview} type="file" name="image" accept="image/*" id="imageinput"></input>
            <form className="edit-campground-form" onSubmit={handleSubmit}>

                <p>update description</p>
                <input id="desc" required value={desc} onChange={handleChangeDesc} />

                <p>update cost</p>
                <input required id="cost" value={cost} onChange={handleChangeCost} />

                <input type="submit" value="update campground" />
            </form>
        </div>
    )
}

export default CanpgroundEdit
