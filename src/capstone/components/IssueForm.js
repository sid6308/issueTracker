import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addIssueAsync } from "./issuesSlice";
import { useHistory, Redirect, Prompt } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const IssueForm = ({ authorized }) => {
  const [ischanged, setIschanged] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        desc: "",
        severity: "",
        status: "",
        cdate: "",
        rdate: "",
      },
      onSubmit: (values) => {
        setIschanged(false);
        dispatch(addIssueAsync(values));
        toast.success("Issues is created successfully.", {
          position: "top-center",
          autoClose: 1000,
        });
        setTimeout(() => {
          history.push("/");
        }, 1000);
      },
      validationSchema: Yup.object().shape({
        desc: Yup.mixed().required("Issue description is mandatory."),
        severity: Yup.mixed().required("Severity is mandatory."),
        status: Yup.mixed().required("Status is mandatory"),
        cdate: Yup.mixed().required("Issue creation date is mandatory."),
        rdate: Yup.mixed().required("Issue resolution date is mandatory."),
      }),
    });
  if (!authorized) {
    return <Redirect to="/signin" />;
  }
  return (
    <>
      <Prompt
        when={ischanged}
        message="Are you sure you want to leave this page."
      />
      <div className="container issue-add">
        <div className="issue-form">
          <h1 className="hlead">Add Issue</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="mar" htmlFor="desc">
                Description:<span className="mandatory">*</span>
              </label>
              <textarea
                className="form-control"
                id="desc"
                name="desc"
                onClick={() => setIschanged(true)}
                value={values.desc}
                rows="3"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ resize: "none" }}
              ></textarea>
            </div>
            {errors.desc && touched.desc ? (
              <div className="text-danger">{errors.desc}</div>
            ) : null}
            <div className="form-group">
              <label className="mar" htmlFor="severity">
                Severity:<span className="mandatory">*</span>
              </label>
              <select
                className="form-control"
                id="severity"
                value={values.severity}
                onChange={handleChange}
                onBlur={handleBlur}
                name="severity"
              >
                <option value="">--Select--</option>
                <option value="Minor">Minor</option>
                <option value="Major">Major</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            {errors.severity && touched.severity ? (
              <div className="text-danger">{errors.severity}</div>
            ) : null}
            <div className="form-group">
              <label className="mar" htmlFor="status">
                Status:<span className="mandatory">*</span>
              </label>
              <br />
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="status"
                  id="inlineRadio1"
                  value="Open"
                />
                <label className="form-check-label">Open</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="status"
                  id="inlineRadio2"
                  value="In-Progress"
                />
                <label className="form-check-label">In Progress</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="inlineRadio3"
                  value="Closed"
                />
                <label className="form-check-label">Closed</label>
              </div>
            </div>
            {errors.status && touched.status ? (
              <div className="text-danger">{errors.status}</div>
            ) : null}
            <div className="form-group">
              <label className="mar" htmlFor="cdate">
                Creation Date:<span className="mandatory">*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="date"
                value={values.cdate}
                onChange={handleChange}
                onBlur={handleBlur}
                name="cdate"
                id="cdate"
              />
            </div>
            {errors.cdate && touched.cdate ? (
              <div className="text-danger">{errors.cdate}</div>
            ) : null}
            <div className="form-group">
              <label className="mar" htmlFor="rdate">
                Resolution Date:<span className="mandatory">*</span>
              </label>
              <input
                className="form-control"
                type="date"
                name="rdate"
                id="rdate"
                value={values.rdate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.rdate && touched.rdate ? (
              <div className="text-danger">{errors.rdate}</div>
            ) : null}

            <br />
            <button type="submit" className="btn btn-primary">
              Add Issue
            </button>
            <br />
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default IssueForm;
