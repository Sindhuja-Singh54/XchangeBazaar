import React from 'react';
import ReactStars from 'react-rating-stars-component';

const ReviewCard = ({review}) => {
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      };
    
  return (
    <div className="reviewCard">
    <img src="https://raw.githubusercontent.com/meabhisingh/mernProjectEcommerce/master/frontend/src/images/Profile.png" alt="User" />
    <p>{review.name}</p>
    <ReactStars {...options} />
    <span className="reviewCardComment">{review.comment}</span>
  </div>
  )
}

export default ReviewCard