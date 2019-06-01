import React from "react";

const Opentime = props => {
  const detail = { props };
  return (
    <div className="row">
      <div className="col-md-6 border-right pr-4">
        <table className="table text-sm mb-0 ">
          <tbody>
            <tr>
              <th className="pl-0 border-0">Sunday</th>
              <td className="pr-0 text-right border-0">8:00 am - 6:00 pm</td>
            </tr>
            <tr>
              <th className="pl-0">Monday</th>
              <td className="pr-0 text-right">8:00 am - 6:00 pm</td>
            </tr>
            <tr>
              <th className="pl-0">Tuesday</th>
              <td className="pr-0 text-right">8:00 am - 6:00 pm</td>
            </tr>
            <tr>
              <th className="pl-0">Wednesday</th>
              <td className="pr-0 text-right">8:00 am - 6:00 pm</td>
            </tr>
            <tr>
              <th className="pl-0">Thursday</th>
              <td className="pr-0 text-right">8:00 am - 6:00 pm</td>
            </tr>
            <tr>
              <th className="pl-0">Friday</th>
              <td className="pr-0 text-right">8:00 am - 6:00 pm</td>
            </tr>
            <tr>
              <th className="pl-0">Saturday</th>
              <td className="pr-0 text-right">Closed</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-md-6 mt-4">
        <ul className="list-unstyled text-muted ml-3 ">
          <li className="mb-2 d-flex">
            <i className="fas fa-map-marker-alt fa-2x mr-4" />
            <span className="text-sm">Address</span>
          </li>
          <p className="mb-4">{detail.restaurant_address}</p>
          <li className="d-flex">
            <i className="fas fa-phone-square fa-2x mr-3" />
            <span>+61870731231</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Opentime;
