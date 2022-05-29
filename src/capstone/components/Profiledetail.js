import React from "react";

const Profiledetail = ({ users, localemail }) => {
  const userpro = users.find((el) => el.email === localemail);
  return (
    <div>
      <div className="container view-profile">
        <h1 className="profilelead">Welcome {userpro.fname} </h1>
        <div className="card view-profile-detail ">
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Email ID:
                <span className="pemail">{userpro.email}</span>
              </li>
              <li className="list-group-item">
                Full Name:
                <span className="pfullname">
                  {userpro.fname} {userpro.lname}
                </span>
              </li>
              <li className="list-group-item">
                Location:<span className="ilocation">{userpro.location}</span>
              </li>
              <li className="list-group-item">
                Mobile<span className="pmobile">{userpro.mobile}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiledetail;
