import React from 'react'

  function Stars(props){
    const stars = []
    var className  = "star" + props.rating + " fas fa-star"
    for (var i = 0; i < props.rating; i++) {
        stars.push(<i className={className}></i>)
    }

    if(stars.length <= 0 ){
        return(
            <p><i className="fas fa-star"></i> No reviews</p>
        )
    }

    return(
        <div className="stars-cont">
            {stars}
        </div>
    )
}
export default Stars
 