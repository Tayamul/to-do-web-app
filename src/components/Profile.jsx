import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import "./profile.css";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <section className="profile-container">
      <img
        className="profile-image"
        src={currentUser.photoURL}
        alt="display avatar"
      ></img>
          <p className="profile-name">{currentUser.displayName}</p>
          <p className="profile-email">{currentUser.email}</p>
    </section>
  );
};

export default Profile;
