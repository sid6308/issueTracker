import React from "react";
import like from "../NotFound.svg";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="container notfound">
      <img width={"50%"} src={like} alt="NotFound" />
      <br />
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;
