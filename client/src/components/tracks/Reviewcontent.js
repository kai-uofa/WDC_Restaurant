import React from "react";
import StarRatingComponent from "react-star-rating-component";

const Reviewcontent = props => {
  return (
    <div className="media d-block d-sm-flex review">
      <div className="media-body">
        <h4 className="mt-2 ">{props.review.first_name}</h4>
        <div>
          <StarRatingComponent
            name="rate2"
            editing={false}
            starCount={5}
            value={props.review.rating}
          />
        </div>
        <p className="text-muted">{props.review.content}</p>
      </div>
    </div>
  );
};

export default Reviewcontent;
