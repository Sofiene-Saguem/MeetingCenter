import React from "react";
import "./Profile.css";
import z from "../Assets/Riadh.jpg";
const Profile = () => {
  return (
    <div className="Profile">
      <div class="container__profile">
        <div class="img-container__profile">
          <img src={z} alt="Photo profile" />
        </div>
        <p class="full-name__profile">Mark McGrow</p>
        <p class="role__profile">UX/UI Developer</p>
        <p class="description__profile">
          Hi there! Lorem ipsum dolor, sit amet consectetur adipisicing elit. In
          necessitatibus illum tenetur nostrum harum dolore itaque et amet.
        </p>
        <div class="social-container__profile">
          <button>
            <i class="fab fa-github"></i>
          </button>
          <button>
            <i class="fab fa-twitter"></i>
          </button>
          <button>
            <i class="fab fa-linkedin-in"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
