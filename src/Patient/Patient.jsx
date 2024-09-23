import React, { useState,  useEffect } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { MdCheckCircle, MdCancel } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { HiArrowCircleRight, HiMenu, HiX } from 'react-icons/hi';
import './Patient.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

const questions = [
  "Do you experience frequent abdominal pain?",
  "Have you noticed yellowing of your skin or eyes?",
  "Do you have a history of excessive alcohol consumption?",
  "Are you experiencing unusual fatigue or weakness?",
  "Do you suffer from unexplained weight loss?"
];

const Patient = () => {


  useEffect(() => {
    Aos.init();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/doctor');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <img src="/images/liv2.png" alt="" className="logos" />
        </div>
        <div className="navbar-menu">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <HiX /> : <HiMenu />}
          </button>
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <Link to='/patient' className="sidebar-item">Home</Link>
            <Link to='/booking' className="sidebar-item">Booking</Link>
            <Link to="/admin" className="sidebar-item">Patient Details</Link>
            <Button variant="contained" href="/">
        Login
      </Button>
          </div>
          <div className="navbar-links">
            <Link to='/patient' className="navbar-item">Home</Link>
            <Link to='/booking' className="navbar-item">Booking</Link>
            <Link to="/admin" className="navbar-item">Patient Details</Link>
            <Button variant="contained" href="/">
        Login
      </Button>
          </div>
        </div>
      </nav>
      <section>
        <div className="main-homes">
          <img src="/images/medic4.gif" alt="" className="front" />
          <div className="main-text1" data-aos="zoom-in-up" data-aos-duration="2000">
            <h1>WELCOME TO LIVERMATE</h1>
            <p>Your Liver Is Protected And Predicted Here</p>
            <a href='/booking' className="main-btns">Book Appointment Now<HiArrowCircleRight /></a>
          </div>
        </div>
      </section>
      <section className='aboutus' data-aos="fade-up" data-aos-duration="1000">
      <img src="/images/aboutus.gif" alt="" className="abot" />
        <h1><span>ABOUT</span> US</h1>
        {/* <img src="/images/aboutus.gif" alt="" className="abot" /> */}
        <h3>Your LIVER Under Our PROTECTION</h3>
        <p>
        LiverMate is an technology that promote the direct communication between Doctors, Technicians and Patients by enhancing the
         health of patients superficially. The result outcomes provide information about Medications, Nutrition diet plans, Complication and
          further details. By using this technology the intimate Communication between them is enhanced. At LiverMate,
           we believe that managing liver health should be simple, accessible, empowering for every patient and fosters enhanced 
           collaboration and personalized care. Whether you're living with liver disease or simply want to monitor your liver health, LiverMate is here
            to guide you on your journey to better health and strengthen interaction between healthcare providers and patients, ensuring more proactive and informed decision making.
        </p>
        <p>
          Thank you for choosing us as your healthcare partner. Together, we can achieve optimal health and a brighter future!
        </p>
      </section>
      <section>
        <img src="/images/medical3.gif" alt="" className='back' />
        <Container maxWidth="sm" className="questionnaire-container">
          <Box mt={4} textAlign="center">
            <Typography variant="h4" gutterBottom className="title">
              Liver Disease Questionnaire
            </Typography>
            <Box mt={2} className="question-box">
              <Typography variant="h6" gutterBottom className="question">
                {questions[currentQuestionIndex]}
              </Typography>
              <Button
                variant="contained"
                color="success"
                startIcon={<MdCheckCircle />}
                onClick={() => handleAnswer('Yes')}
                className="answer-button"
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<MdCancel />}
                onClick={() => handleAnswer('No')}
                className="answer-button"
                style={{ marginLeft: 8 }}
              >
                No
              </Button>
            </Box>
          </Box>
        </Container>
      </section>
    </>
  );
};

export default Patient;


