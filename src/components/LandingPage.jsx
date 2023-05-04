// import { Paper, Typography } from "@mui/material";
// import { Container } from "@mui/system";
import React from "react";
import "./landingPage.css";
import notes from '../assets/notes.jpg'

const LandingPage = () => {
  const paperStyle = { padding: "20px 20px", margin: "30px 30px" };
  return (
    <section id='home'>
      <div className="home-container">
        <div className="hero-content">
          <h1>Optimise your daily workflow</h1>
          <p>Improve productivity with our intuitive interface for daily planning</p>
          <div className="cta-btn">
          <button className="cta">Sign up</button>
          <button className="cta-2">Guest login</button>
          </div>
        </div>
        <div>
          <img src={notes} alt='An impression of a user writing down tasks' className="hero-image"/>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;


{/* <Container fixed maxWidth="sm" sx={{ margin: "80px auto" }}>
<Paper elevation={0} sx={paperStyle} align="center">
  <Typography variant="overline">
    Introducing a user-friendly web application designed to facilitate
    daily planning in accordance with your personal preferences. With its
    easy-to-use interface, simply list your tasks and effortlessly mark
    them as completed upon finishing.
  </Typography>
  <br />
  <Typography variant="caption">
    For optimal productivity, we recommend dividing larger tasks into
    smaller, manageable segments, and tackling them one by one. Streamline
    your day-to-day routine and maximize your efficiency with our
    innovative planning tool.
  </Typography>
</Paper>
</Container> */}