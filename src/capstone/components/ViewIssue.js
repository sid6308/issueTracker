import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIssueById, updateIssueAsync } from "./issuesSlice";
import { Link } from "react-router-dom";

const ViewIssue = (props) => {
  const dispatch = useDispatch();
  const issueId = props.match.params.id;
  const issue = useSelector((state) => selectIssueById(state, issueId));
  const { desc, severity, status, cdate, rdate, viewcount } = issue;
  const newitem = viewcount + 1;

  useEffect(() => {
    dispatch(
      updateIssueAsync({
        id: issueId,
        desc: desc,
        severity: severity,
        status: status,
        cdate: cdate,
        rdate: rdate,
        viewcount: newitem,
      })
    );
  }, [dispatch]);
  const handleSever = (val) => {
    if (val === "Minor") {
      return "green";
    } else if (val === "Major") {
      return "orange";
    } else {
      return "red";
    }
  };
  return (
    <div className="view-issue">
      <h1 className="hlead">Issue Details</h1>
      <div className="card view-issue-detail ">
        <div className="card-body">
          <h5 className="card-title">
            Issue ID:<span className="iid">{issue.id}</span>
          </h5>
          <p className="card-text">
            Description:
            <span className="idesc">{issue.desc}</span>
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Severity:
            <span className={`iseverity ${handleSever(issue.severity)}`}>
              {issue.severity}
            </span>
          </li>
          <li className="list-group-item">
            Status:<span className="istatus">{issue.status}</span>
          </li>
          <li className="list-group-item">
            Creation Date:<span className="icdate">{issue.cdate}</span>
          </li>
          <li className="list-group-item">
            Resolution Date:<span className="irdate">{issue.rdate}</span>
          </li>
        </ul>
      </div>
      <Link to="/" type="submit" className="btn btn-primary">
        Back Home
      </Link>
    </div>
  );
};

export default ViewIssue;
