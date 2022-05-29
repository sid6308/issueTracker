import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteIssueAsync } from "./issuesSlice";
import { toast, ToastContainer } from "react-toastify";

const Issue = (props) => {
  const { id, desc, severity, status, cdate, rdate } = props.issues;
  const authinfo = sessionStorage.getItem("auth");

  const { cseverity, cstatus, ccdate, crdate } = props.children;

  const dispatch = useDispatch();
  const handleSever = (val) => {
    if (val === "Minor") {
      return "green";
    } else if (val === "Major") {
      return "orange";
    } else {
      return "red";
    }
  };
  const handleauth = (val) => {
    if (!val) {
      return "d-none";
    }
  };
  const handlefield = (val) => {
    if (!val) {
      return "d-none";
    }
  };
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Issue ID:<span className="iid">{id}</span>
          </h5>
          <p className="card-text">
            Description:
            <span className="idesc">{desc}</span>
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className={`list-group-item ${handlefield(cseverity)}`}>
            Severity:
            <span className={`iseverity ${handleSever(severity)}`}>
              {severity}
            </span>
          </li>
          <li className={`list-group-item ${handlefield(cstatus)}`}>
            Status:<span className="istatus">{status}</span>
          </li>
          <li className={`list-group-item ${handlefield(ccdate)}`}>
            Creation Date:<span className="icdate">{cdate}</span>
          </li>
          <li className={`list-group-item ${handlefield(crdate)}`}>
            Resolution Date:<span className="irdate">{rdate}</span>
          </li>
        </ul>
        <div className="card-body f-center">
          <Link
            to={`/issues/${id}`}
            title="View-Issue"
            className="card-link btn btn-dark"
          >
            <i className="fa fa-eye"></i>
          </Link>
          <Link
            to={`/edit/${id}`}
            className={`card-link btn btn-dark ${handleauth(authinfo)}`}
          >
            <i className="fa fa-edit"></i>
          </Link>
          <Link
            to="/"
            onClick={() => {
              toast.info("Issues deleted successfully.", {
                position: "top-center",
                autoClose: 1000,
              });
              setTimeout(() => {
                dispatch(deleteIssueAsync(id));
              }, 1000);
            }}
            className={`card-link btn btn-dark ${handleauth(authinfo)}`}
          >
            <i className="fa fa-trash"></i>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Issue;
