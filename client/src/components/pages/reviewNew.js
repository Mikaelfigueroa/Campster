import Axios from 'axios';
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { MyContext } from "../myProvider"



export default class NewReview extends Component {
    static contextType = MyContext;
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            redirect: "/login",
            error: null,
            review: {
                last: "",
                first: 0
            },
            text: null,
            rating: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeStars = this.handleChangeStars.bind(this)
    }

    handleSubmit = (params) => {
        params.preventDefault()
        let data = {
            text: this.state.text,
            rating: this.state.rating
        }
        Axios({
            method: "POST",
            url: "/reviews/" + this.props.match.params.campgroundId,
            data: {
                text: this.state.text,
                rating: this.state.rating
            }
        }).then(res => {
            this.props.history.goBack()
        })
    }

    handleChangeStars = (params) => {
        var labels = document.querySelectorAll(".fa-star")
        labels.forEach(n => {
            n.classList.remove("star1", "star2", "star3", "star4", "star5")
        })
        for (var i = 0; i < params.target.value; i++) {
            labels[i].classList.add("star" + params.target.value)
        }
        this.setState({ rating: params.target.value })
    }

    handleChange = (params) => {
        this.setState({ text: params.target.value })
    }


    render() {
        let value = this.context
        if (value.state.checked && !value.state.user) {
            return <Redirect to={"/"} />
        }
        return (
            <div className="review-form-cont">
            <h1 style={{ textAlign: "center", padding: "20px 0px" }}>New Review</h1>
            <form id="reviewform" onSubmit={this.handleSubmit}>
                <span>
                    <input onChange={this.handleChangeStars} type="radio" id="first-rate1" name="reviews[rating]" value="1" />
                    <label for="first-rate1" title="1 star - Terrible"><i class="fa fa-2x fa-star checked"></i></label>

                    <input onChange={this.handleChangeStars} type="radio" id="first-rate2" name="reviews[rating]" value="2" />
                    <label for="first-rate2" title="2 stars - Not good"><i class="fa fa-2x fa-star checked"></i></label>

                    <input onChange={this.handleChangeStars} type="radio" id="first-rate3" name="reviews[rating]" value="3" />
                    <label for="first-rate3" title="3 stars - Average"><i class="fa fa-2x fa-star checked"></i></label>

                    <input onChange={this.handleChangeStars} type="radio" id="first-rate4" name="reviews[rating]" value="4" />
                    <label for="first-rate4" title="4 stars - Very good"><i class="fa fa-2x fa-star checked"></i></label>

                    <input onChange={this.handleChangeStars} type="radio" id="first-rate5" name="reviews[rating]" value="5" />
                    <label for="first-rate5" title="5 stars - Amazing"><i class="fa fa-2x  fa-star checked"></i></label>
                </span>

                <textarea onChange={this.handleChange} class="form-control" type="text" name="reviews[text]" placeholder="Write a review for this campground..." rows="5"></textarea>
                <button class="btn btn-primary btn-block">Submit Review</button>
            </form>
        </div>
        )
    }
}
