import React from "react";

const Reviewcontent = props => {
  return (
    <div className="media d-block d-sm-flex review">
      <div className="media-body">
        <h6 className="mt-2 mb-1">Princess Leia</h6>
        <div className="mb-2">
          <i className="fa fa-xs fa-star text-primary" />
          <i className="fa fa-xs fa-star text-primary" />
          <i className="fa fa-xs fa-star text-primary" />
          <i className="fa fa-xs fa-star text-gray-200" />
          <i className="fa fa-xs fa-star text-gray-200" />
        </div>
        <p className="text-muted text-sm">
          We had an engagement party here and the staff and service was amazing.
          They were so profesional and kept everybody happy. I'm so grateful. We
          will be returning some day!
        </p>
      </div>
    </div>
  );
};

export default Reviewcontent;
