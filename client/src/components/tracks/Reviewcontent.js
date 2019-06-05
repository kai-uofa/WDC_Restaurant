import React from "react";

const Reviewcontent = props => {
  return (
    <div className="media d-block d-sm-flex review">
      <div className="media-body">
        <h6 className="mt-2 mb-1">{props.review.first_name}</h6>
        {/* FIXME: change rating and update layout for each review */}
        <div className="mb-2">
          <i className="fa fa-xs fa-star text-primary" />
          <i className="fa fa-xs fa-star text-primary" />
          <i className="fa fa-xs fa-star text-primary" />
          <i className="fa fa-xs fa-star text-gray-200" />
          <i className="fa fa-xs fa-star text-gray-200" />
        </div>
        <p className="text-muted text-sm">{props.review.content}</p>
      </div>
    </div>
  );
};

export default Reviewcontent;
