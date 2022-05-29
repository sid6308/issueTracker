import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersAsync } from "./usersSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(loadUsersAsync());
  }, [dispatch]);
  const { handleBlur, handleSubmit, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        email: "",
        pword: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.mixed().required("Please enter the registered email id."),
        pword: Yup.mixed().required("Please enter your password."),
      }),
      onSubmit: (values) => {
        const { email, pword } = values;
        const validate = users.find(
          (element) => email === element.email && pword === element.pword
        );
        if (validate) {
          toast.success("Login Successfull.", {
            position: "top-center",
            autoClose: 1500,
          });
          sessionStorage.setItem("user-email", values.email);
          sessionStorage.setItem("user-pword", values.pword);
          sessionStorage.setItem("auth", true);
          history.replace("/profile");
          history.go();
        } else {
          toast.error("Invalid email or password.", {
            position: "top-center",
            autoClose: 1500,
          });
        }
      },
    });
  return (
    <>
      <div className="container login">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h1 className="hlead">Login Form</h1>
            <div className="form-group">
              <label className="mar" htmlFor="uname">
                Email:
              </label>
              <input
                className="form-control"
                type="text"
                id="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter email ID"
                onBlur={handleBlur}
                autoComplete="off"
                name="email"
              ></input>
            </div>
            {errors.email && touched.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}
            <div className="form-group">
              <label className="mar" htmlFor="pword">
                Password:
              </label>
              <input
                className="form-control"
                type="password"
                id="pword"
                value={values.pword}
                onChange={handleChange}
                placeholder="Enter password"
                onBlur={handleBlur}
                data-testid="pword"
                name="pword"
              ></input>
            </div>
            {errors.pword && touched.pword ? (
              <div className="text-danger">{errors.pword}</div>
            ) : null}
            <button
              type="submit"
              style={{ marginTop: "20px" }}
              className="btn btn-primary"
              data-testid="Login"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
