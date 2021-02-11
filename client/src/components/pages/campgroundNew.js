import React, { Component } from 'react'
import Axios from 'axios'
import { BrowserRouter as Router, Route, Link, Redirect, useHistory, withRouter } from 'react-router-dom'
import { MyContext } from "../myProvider"

export default class CampgroundNew extends Component {
    static contextType = MyContext;
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            redirect: "/login",
            error: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.imagePreview = this.imagePreview.bind(this)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let value = this.context
        var formData = new FormData()
        var imagefile = document.querySelector('#imageinput')
        formData.append("image", imagefile.files[0])
        formData.append("name", document.getElementById("name").value)
        formData.append("cost", document.getElementById("cost").value)
        formData.append("location", document.getElementById("location").value)
        formData.append("desc", document.getElementById("desc").value)
        Axios.post('/campgrounds', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res.data._id)
            this.setState({ redirect: "/campgrounds/" + res.data._id })
        }).catch( (err)=>{
            console.log(err.response.data)
            this.setState({error: err.response.data})
        })
    }

    imagePreview(event) {
        if(event.target.files[0]){
            this.setState({
                file: URL.createObjectURL(event.target.files[0])
            })
        }
        else{
            this.setState({file: null})
        }
    }

    render() {
        let value = this.context;
        if (value.state.checked && !value.state.user) {
            return <Redirect to={"/"} />
        }

        if (this.state.redirect != "/login") {
            return <Redirect to={{
                pathname: this.state.redirect
            }} />
        }

        return (
            <div className="new-campground">
                {this.state.error && <p className="error">{this.state.error}</p>}
                <h1 className="text-center" style={{paddingTop: "10px"}}>New campground</h1>
                <form onSubmit={this.handleSubmit} className="new-form wrapper">
                    <input type="text" id="name" placeholder="Campground name..." required />
                    {this.state.file && <img id="imagepreview" src={this.state.file} />}

                    <label for="imageinput">Select image</label>
                    <input  className="hidden" type="file" onChange={this.imagePreview} accept="image/*" id="imageinput" required />


                    <input type="number" id="cost" placeholder="Campground cost per night..." required />
                    <input type="text" id="location" placeholder="Campground address..." required />
                    <textarea type="text" id="desc" placeholder="Campground description" rows="10" required />
                    <input type="submit" id="submit" value="Submit" required />
                </form>
            </div>
        )
    }
}
