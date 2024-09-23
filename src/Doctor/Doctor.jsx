import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowCircleRight, HiMenu, HiX, HiPencil } from "react-icons/hi";
import Button from '@mui/material/Button';
import './Doctor.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Doctor = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('/images/profile.jpg'); // Default profile image
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    Aos.init();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setIsEditing(false); // Close the edit mode after selecting an image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <img src="/images/liv2.png" alt="" className="logos" />
          <div className="profile-section">
            <img src={profileImage} alt="Profile" className="profile-image" />
            {/* Remove the edit button from the navbar */}
          </div>
        </div>
        <div className="navbar-menu">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <HiX /> : <HiMenu />}
          </button>
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-profile">
              <img src={profileImage} alt="Profile" className="sidebar-profile-image" />
              <Button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
                <HiPencil />
              </Button>
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-input"
                  style={{ display: 'block' }} // Show the input when editing
                />
              )}
            </div>
            <Link to='/doctor' className="sidebar-item">Home</Link>
            <Link to='/prediction' className="sidebar-item">Prediction</Link>
            <Link to="/admin" className="sidebar-item">Patient Details</Link>
            <Button variant="contained" href="/">
              Login
            </Button>
          </div>
          <div className="navbar-links">
            <Link to='/doctor' className="navbar-item">Home</Link>
            <Link to='/prediction' className="navbar-item">Prediction</Link>
            <Link to="/admin" className="navbar-item">Patient Details</Link>
            <Button variant="contained" href="/">
              Login
            </Button>
          </div>
        </div>
      </nav>
      <section>
        <div className="main-home">
          <img src="/images/medic2.gif" alt="" className="front" data-aos="zoom-in-up" data-aos-duration="2000" />
          <div className="main-text" data-aos="zoom-in-up" data-aos-duration="2000">
            <h1>WELCOME DOCTOR</h1>
            <p>Check your liver with us And Stay Healthy</p>
            <a href='/prediction' className="main-btn">Predict Now <HiArrowCircleRight /></a>
          </div>
        </div>
      </section>
      <section className='aboutus' data-aos="fade-up" data-aos-duration="1000">
        <img src="/images/aboutus.gif" alt="" className="abot" />
        <h1><span>ABOUT</span> US</h1>
        <h3>Your LIVER Under Our PROTECTION</h3>
        <p>
          LiverMate is a technology that promotes direct communication between Doctors, Technicians, and Patients by enhancing the
          health of patients superficially. The resulting outcomes provide information about Medications, Nutrition diet plans, Complications, and
          further details. By using this technology, intimate communication between them is enhanced. At LiverMate,
          we believe that managing liver health should be simple, accessible, empowering for every patient, and fosters enhanced 
          collaboration and personalized care. Whether you're living with liver disease or simply want to monitor your liver health, LiverMate is here
          to guide you on your journey to better health and strengthen interaction between healthcare providers and patients, ensuring more proactive and informed decision making.
        </p>
        <p>
          Thank you for choosing us as your healthcare partner. Together, we can achieve optimal health and a brighter future!
        </p>
      </section>
      <section className="cards-section" data-aos="fade-up" data-aos-duration="1000">
        <h1><span>FEATURES</span></h1>
        <div className="card">
          <img src="/images/symtop.jpeg" alt="" className="card-image" />
          <div className="card-text">
            <h3>SYMPTOM LOGGING</h3>
            <h5>This feature allows users to track and record their physical health symptoms over time.</h5>
          </div>
        </div>
        <div className="card">
          <img src="/images/liver21.jpeg" alt="Card 2" className="card-image" />
          <div className="card-text">
            <h3>PREDICTION</h3>
            <h5>This feature helps people proactively manage their health by providing insights and enabling early interventions to prevent symptoms or complications.</h5>
          </div>
        </div>
        <div className="card">
          <img src="/images/medication.jpg" alt="Card 3" className="card-image" />
          <div className="card-text">
            <h3>MEDICATION</h3>
            <h5>This feature refers to a component designed to manage, track, and optimize the use of medication for patients.</h5>
          </div>
        </div>
        <img src="/images/doc.png" alt="" className="logo" />
      </section>
    </>
  );
};

export default Doctor;
