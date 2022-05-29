import React from "react";
import { useSelector } from "react-redux";
import Profiledetail from "./Profiledetail";
import { Redirect } from "react-router-dom";

const Profile = ({ authorized }) => {
  const localemail = sessionStorage.getItem("user-email");
  const users = useSelector((state) => state.users.users);
  if (!authorized) {
    return <Redirect to="/signin" />;
  }
  return (
    <>
      {users
        .filter((val) => {
          return val.email === localemail;
        })
        .map((user) => (
          <Profiledetail key={user.id} users={users} localemail={localemail} />
        ))}
    </>
  );
};
export default Profile;
