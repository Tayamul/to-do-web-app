import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import "./profile.css";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <section className="profile-container">
      <img
        className="profile-image"
        src={currentUser.photoURL}
        alt="display avatar"
      ></img>
      <div>
          <p style={{textAlign:"center"}}>{currentUser.displayName}</p>
        <form className="profile-form">
          <label>Current Password</label>
          <input type='password' />
          <label>New Password</label>
          <input type='password' />
          <label>Confirm Password</label>
          <input type='password' />
          <button className="profile-btn">Change password</button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
