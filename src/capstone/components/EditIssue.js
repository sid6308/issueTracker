import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIssueById, updateIssueAsync } from "./issuesSlice";
import { useHistory, Redirect, Prompt } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const EditIssue = (props) => {
  const issueId = props.match.params.id;
  const authinfo = sessionStorage.getItem("auth");
  const [ischanged, setIschanged] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const issue = useSelector((state) => selectIssueById(state, issueId));
  const { handleChange, handleSubmit, handleBlur, errors, touched, values } =
    useFormik({
      initialValues: issue,
      onSubmit: (values) => {
        const { desc, severity, status, cdate, rdate } = values;
        setIschanged(false);
        dispatch(
          updateIssueAsync({
            id: issueId,
            desc: desc,
            severity: severity,
            status: status,
            cdate: cdate,
            rdate: rdate,
          })
        );
        toast.success("Ticked updated successfully.", {
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
  if (!authinfo) {
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
          <form onSubmit={handleSubmit}>
            <h1 className="hlead">Update Issue</h1>
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
                onChange={handleChange}
                onClick={() => setIschanged(true)}
                onBlur={handleBlur}
                name="severity"
                value={values.severity}
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
                  name="status"
                  checked={values.status === "Open"}
                  id="inlineRadio1"
                  onChange={handleChange}
                  onClick={() => setIschanged(true)}
                  onBlur={handleBlur}
                  value="Open"
                />
                <label className="form-check-label">Open</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={values.status === "In-Progress"}
                  name="status"
                  onChange={handleChange}
                  onClick={() => setIschanged(true)}
                  onBlur={handleBlur}
                  id="inlineRadio2"
                  value="In-Progress"
                />
                <label className="form-check-label">In progress</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="inlineRadio3"
                  checked={values.status === "Closed"}
                  onChange={handleChange}
                  onClick={() => setIschanged(true)}
                  onBlur={handleBlur}
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
              <input
                className="form-control"
                type="date"
                value={values.cdate}
                onChange={handleChange}
                onClick={() => setIschanged(true)}
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
                value={values.rdate}
                onChange={handleChange}
                onClick={() => setIschanged(true)}
                onBlur={handleBlur}
                name="rdate"
                id="rdate"
              />
            </div>
            {errors.rdate && touched.rdate ? (
              <div className="text-danger">{errors.rdate}</div>
            ) : null}
            <br />
            <button type="submit" className="btn btn-primary">
              Update Issue
            </button>
            <Link
              to="/"
              style={{ marginLeft: "20px" }}
              className="btn btn-primary"
            >
              Back Home
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditIssue;
