import React from 'react';
import {
    BrowserRouter as Router, Route, Link, Redirect, useHistory,
} from 'react-router-dom'
import axios from 'axios';
import { MyContext } from "../myProvider"


class ProfileEdit extends React.Component {
    static contextType = MyContext;
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            redirect: null,
            user: {
                username: null,
                _id: null,
                posts: [],
                followers: [],
                following: [],
                image: null
            },
            image: null,
            file: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
        this.imagePreview = this.imagePreview.bind(this)
    }
    goBack() {
        this.props.history.goBack()
    }
    handleSubmit(event) {
        event.preventDefault()
        var formData = new FormData();
        if (this.state.file) {
            var imageFile = document.querySelector('#imageinput');
            formData.append("image", imageFile.files[0]);
        }
        axios.put('/user', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            let value = this.context;
            value.setUser(res.data)
            this.setState({ redirect: "/profile/" + value.state.user._id })
        })
    }

    imagePreview(event) {
        this.setState({ image: URL.createObjectURL(event.target.files[0]) })
        this.setState({ file: true })
    }
    componentDidMount() {
        let value = this.context;
        console.log(value.state)
        this.setState({ user: value.state.user })
        this.setState({ image: value.state.user.image })
    }

    render() {
        let value = this.context;
        if (this.state.redirect) {
            return <Redirect to={"/profile/" + value.state.user._id} />
        }
        return (
            <div className="profile-edit">

                <div className="profile-edit-header">
                    <p onClick={this.goBack}><i class="fas fa-arrow-left"></i> Profile</p>
                </div>

                <form className="profile-edit-form" onSubmit={this.handleSubmit}>
                    <h1>Edit Profile</h1>
                    <img id="imagepreview" src={this.state.image} />
                    <label className="image-label" for="imageinput">Change Profile Photo</label>

                    <input className="hidden" onInput={this.imagePreview} type="file" name="image" accept="image/*" id="imageinput"></input>
                    <input type="submit" value="Upate Profile" />
                </form>
            </div>
        )
    }
}
export default ProfileEdit