import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loadUsersAsync } from "./usersSlice";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const auth = sessionStorage.getItem("auth");
  const logout = () => {
    sessionStorage.clear();
    toast.info("You have been logged out.", {
      position: "top-center",
      autoClose: 1500,
    });
    history.go();
  };
  const handlenav = (val) => {
    if (val) {
      return "d-none";
    }
  };
  const handlelog = (val) => {
    if (val.length === 0) {
      return "d-none";
    }
  };
  useEffect(() => {
    dispatch(loadUsersAsync());
  }, [dispatch]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink to="/" className="navbar-brand">
          <i className="fa fa-bug"></i> Tracker
        </NavLink>
        <button
          className="navbar-toggler text-center"
          type="button"
          onClick={() => setShow((prevShow) => !prevShow)}
          data-toggle="collapse"
          data-target="testnavbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {show ? (
            <i className="fa fa-bars"></i>
          ) : (
            <i className="fa fa-times"></i>
          )}
        </button>

        <div
          className={
            show
              ? "collapse navbar-collapse"
              : "collapse navbar-collapse active"
          }
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/add" className="nav-link">
                Add Issues &nbsp;<i className="fa fa-plus"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About Us &nbsp;<i className="fa fa-info-circle"></i>
              </NavLink>
            </li>
            <li className={`nav-item active ${handlelog(sessionStorage)}`}>
              <NavLink to="/chart" className="nav-link">
                Chart &nbsp;<i className="fa fa-bar-chart"></i>
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className={`nav-item active ${handlenav(auth)}`}>
              <NavLink to="/signin" className="nav-link">
                Sign In <i className="fa fa-sign-in"></i>
              </NavLink>
            </li>

            <li className={`nav-item active ${handlelog(sessionStorage)}`}>
              <NavLink to="/profile" className="nav-link">
                Profile <i className="fa fa-id-card"></i>
              </NavLink>
            </li>

            <li className={`nav-item active ${handlelog(sessionStorage)}`}>
              <NavLink
                to="/signin"
                onClick={logout}
                style={{ outline: "none", border: "none" }}
                className="nav-link"
              >
                Log Out <i className="fa fa-sign-out"></i>
              </NavLink>
            </li>

            <li className={`nav-item active ${handlenav(auth)}`}>
              <NavLink to="signup" className="nav-link">
                Register <i className="fa fa-user-plus"></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
