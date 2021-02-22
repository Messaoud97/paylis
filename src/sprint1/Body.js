import React from "react";
import { NavLink } from "react-router-dom";
import aze from "../ressources/dark.png";

const Body = function() {
  let Background = aze;
  var sectionStyle = {
    width: "100%",
    height: "720px",
    backgroundImage: `url(${Background})`,
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  };

  return (
    <section style={sectionStyle}>
      <div className="position-relative overflow-hidden  text-center text-light">
        <div className="col-md-6 p-lg-5 mx-auto my-5">
          <h1 className="display-4 font-weight-normal fahmi">
            K2Lis Microfinance Platform
          </h1>
          <p className="fahmi">
            Crowdfunding is a way to raise money for an individual or
            organization by collecting donations through family, friends,
            friends of friends, strangers, businesses, and more. By using social
            media to spread awareness, people can reach more potential donors
            than traditional forms of fundraising.
          </p>
          <NavLink className="btn btn-danger fahmi" to="/xyz">
            Coming soon
          </NavLink>
        </div>
        <div className="product-device box-shadow d-none d-md-block" />
        <div className="product-device product-device-2 box-shadow d-none d-md-block" />
      </div>
    </section>
  );

  //background="https://res.cloudinary.com/jerrick/image/upload/f_gif,fl_progressive,q_auto/hgjbuqpshv7xg1bypizm.gif"
};
export default Body;
