import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'



const EditReview = (props) => {
    const [text, setText] = useState(props.location.state.review.text)
    const [rating, setRating] = useState(props.location.state.review.rating)
    const [review, setReview] = useState(props.location.state.review)
    let history = useHistory()

    const handleSubmit = (params) => {
        params.preventDefault()
        Axios({
            method: "PUT",
            url: "/reviews/" + review.campground + "/" + review._id,
            data: {
                text: text,
                rating: rating
            }
        }).then(res => {
            history.goBack()
        })
    }

    useEffect(() => {
        var labels = document.querySelectorAll(".fa-star")
        for (var i = 0; i < rating; i++) {
            labels[i].classList.add("star" + rating)
        }
    }, [])

    const handleChangeStars = (params) => {
        var labels = document.querySelectorAll(".fa-star")
        labels.forEach(n => {
            n.classList.remove("star1", "star2", "star3", "star4", "star5")
        })
        for (var i = 0; i < params.target.value; i++) {
            labels[i].classList.add("star" + params.target.value)
        }
        setRating(params.target.value)
    }

    const handleChange = (params) => {
        setText(params.target.value)
    }

    return (
        <div className="review-form-cont">
            <h1 style={{ textAlign: "center", padding: "20px 0px" }}>Edit Review</h1>
            <form id="reviewform" onSubmit={handleSubmit}>
                <span>
                    <input onChange={handleChangeStars} type="radio" id="first-rate1" name="reviews[rating]" value="1" />
                    <label for="first-rate1" title="1 star - Terrible"><i class="fa fa-2x fa-star checked"></i></label>

                    <input onChange={handleChangeStars} type="radio" id="first-rate2" name="reviews[rating]" value="2" />
                    <label for="first-rate2" title="2 stars - Not good"><i class="fa fa-2x fa-star checked"></i></label>

                    <input onChange={handleChangeStars} type="radio" id="first-rate3" name="reviews[rating]" value="3" />
                    <label for="first-rate3" title="3 stars - Average"><i class="fa fa-2x fa-star checked"></i></label>

                    <input onChange={handleChangeStars} type="radio" id="first-rate4" name="reviews[rating]" value="4" />
                    <label for="first-rate4" title="4 stars - Very good"><i class="fa fa-2x fa-star checked"></i></label>

                    <input onChange={handleChangeStars} type="radio" id="first-rate5" name="reviews[rating]" value="5" />
                    <label for="first-rate5" title="5 stars - Amazing"><i class="fa fa-2x  fa-star checked"></i></label>
                </span>

                <textarea onChange={handleChange} class="form-control" type="text" name="reviews[text]" placeholder="Write a review for this campground..." rows="5"></textarea>
                <button class="btn btn-primary btn-block">Submit Review</button>
            </form>
        </div>
    )

}
export default EditReview
