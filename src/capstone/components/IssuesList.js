import React, { useEffect, useState } from "react";
import Issue from "./Issue";
import { useSelector, useDispatch } from "react-redux";
import { loadIssuesAsync } from "./issuesSlice";

const IssuesList = () => {
  const issues = useSelector((state) => state.issues.issues);
  const [search, setSearch] = useState("");
  const [cseverity, setCseverity] = useState(
    useSelector((state) => state.issues.iseverity)
  );
  const [cstatus, setCstatus] = useState(
    useSelector((state) => state.issues.istatus)
  );
  const [ccdate, setCcdate] = useState(
    useSelector((state) => state.issues.icdate)
  );
  const [crdate, setCrdate] = useState(
    useSelector((state) => state.issues.irdate)
  );
  const obj1 = {
    cseverity,
    cstatus,
    ccdate,
    crdate,
  };
  const handleseverity = (e) => {
    setCseverity((prevState) => !prevState);
  };
  const handlestatus = (e) => {
    setCstatus((prevState) => !prevState);
  };
  const handlecdate = (e) => {
    setCcdate((prevState) => !prevState);
  };
  const handlerdate = (e) => {
    setCrdate((prevState) => !prevState);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadIssuesAsync());
  }, [dispatch]);

  if (issues.length < 1)
    return (
      <div className="container issues-list">
        <h1 style={{ textAlign: "center" }}>
          There are no Issues in the Database
        </h1>
      </div>
    );
  return (
    <div className="container issues-list">
      <input
        className="form-control"
        name="search"
        value={search}
        autoComplete="off"
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "80%", margin: "0.5rem auto" }}
        type="text"
        placeholder="Search...."
      />
      <div className=" show_hide">
        <input
          type="checkbox"
          checked={cseverity === true}
          onChange={handleseverity}
          name="severity"
          id="severity"
        />
        <label htmlFor="severity">Severity</label>
        <input
          type="checkbox"
          name="status"
          checked={cstatus === true}
          onChange={handlestatus}
          id="status"
        />
        <label htmlFor="status">Status</label>
        <input
          type="checkbox"
          name="cdate"
          checked={ccdate === true}
          onChange={handlecdate}
          id="cdate"
        />
        <label htmlFor="cdate">Creation Date</label>
        <input
          type="checkbox"
          name="rdate"
          checked={crdate === true}
          onChange={handlerdate}
          id="rdate"
        />
        <label htmlFor="rdate">Resolution Date</label>
      </div>

      <div className="grid">
        {issues
          .filter((val) => {
            if (search === "") {
              return val;
            } else {
              return Object.values(val)
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase());
            }
          })
          .map((issue) => (
            <Issue key={issue.id} issues={issue}>
              {obj1}
            </Issue>
          ))}
      </div>
    </div>
  );
};

export default IssuesList;
