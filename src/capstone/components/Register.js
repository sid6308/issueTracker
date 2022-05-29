import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAsync, loadUsersAsync } from "./usersSlice";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const Register = () => {
  const dispatch = useDispatch("");
  const history = useHistory();
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(loadUsersAsync());
  }, [dispatch]);
  const phoneRegExp = /^[0-9]{10}$/;
  const passRegExp =
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        pword: "",
        fname: "",
        lname: "",
        location: "",
        mobile: "",
      },
      onSubmit: (values) => {
        const checkEmail = values.email;
        const newitems = users.find((value) => checkEmail === value.email);
        if (!newitems) {
          dispatch(addUserAsync(values));
          toast.success("You account has been created successfully.", {
            position: "top-center",
            autoClose: 2000,
          });
          setTimeout(() => {
            history.push("/signin");
          }, 2000);
        } else {
          toast.error("The email address is already being used.", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      },
      validationSchema: Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email Id.")
          .required("Email ID is mandatory."),
        pword: Yup.string()
          .matches(
            passRegExp,
            "Password must be minimum 8 character, at least one uppercase letter, one lowercase letter, one number and one special character"
          )
          .required("Please set password."),
        fname: Yup.string()
          .max(14, "Max character is 14")
          .required("First name is mandatory."),
        lname: Yup.string()
          .max(14, "Max character is 14")
          .required("Last name is mandatory."),
        location: Yup.mixed().required("Location is mandatory."),
        mobile: Yup.string()
          .matches(phoneRegExp, "Mobile No is not valid")
          .required("Mobile number is mandatory."),
      }),
    });

  return (
    <>
      <div className="container signup">
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <h1 className="hlead">Sign Up Form</h1>
            <div className="form-group">
              <label className="mar" htmlFor="email">
                Email:<span className="mandatory">*</span>
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            {touched.email && errors.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}
            <div className="form-group">
              <label className="mar" htmlFor="pword">
                Password:<span className="mandatory">*</span>
              </label>
              <input
                className="form-control"
                type="password"
                id="pword"
                name="pword"
                value={values.pword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {touched.pword && errors.pword ? (
              <div className="text-danger">{errors.pword}</div>
            ) : null}
            <div className="form-group">
              <label className="mar" htmlFor="fname">
                First Name:<span className="mandatory">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                id="fname"
                name="fname"
                autoComplete="off"
                onBlur={handleBlur}
                value={values.fname}
                onChange={handleChange}
              />
            </div>
            {touched.fname && errors.fname ? (
              <div className="text-danger">{errors.fname}</div>
            ) : null}
            <div className="form-group">
              <label className="mar" htmlFor="lname">
                Last Name:<span className="mandatory">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                id="lname"
                name="lname"
                autoComplete="off"
                value={values.lname}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {touched.lname && errors.lname ? (
              <div className="text-danger">{errors.lname}</div>
            ) : null}
            <div className="form-group">
              <label className="mar" htmlFor="location">
                Location:<span className="mandatory">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                id="location"
                name="location"
                autoComplete="off"
                value={values.location}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {touched.location && errors.location ? (
              <div className="text-danger">{errors.location}</div>
            ) : null}
            <div className="form-group">
              <label className="mar" htmlFor="mobile">
                Mobile No:<span className="mandatory">*</span>
              </label>
              <input
                className="form-control"
                type="tel"
                id="mobile"
                name="mobile"
                value={values.mobile}
                onBlur={handleBlur}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            {touched.mobile && errors.mobile ? (
              <div className="text-danger">{errors.mobile}</div>
            ) : null}
            <button
              type="submit"
              style={{ marginTop: "20px" }}
              className="btn btn-primary"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
