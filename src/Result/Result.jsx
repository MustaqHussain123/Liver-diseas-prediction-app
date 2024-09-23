import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from "react-icons/hi";
import './Result.css';

const Result = () => {
  const [formData, setFormData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('formData'));
    setFormData(data);
  }, []);

  if (!formData) return <div className="no-data">No data available</div>;

  const { name, age, gender, risk } = formData;

  // Default risk value if `risk` is undefined
  const riskValue = risk || 'unknown';

  const getMedicationAndTracking = (risk) => {
    switch (risk) {
      case 'high':
        return {
          medication: 'High-risk medication and frequent symptom tracking are advised. Regular follow-ups with a specialist are essential. Monitor for symptoms like jaundice, abdominal pain, and unusual fatigue.',
          symptomTracking: 'Daily monitoring of bilirubin levels, liver enzymes, and overall health is crucial. Keep a detailed record of symptoms and any changes in health.'
        };
      case 'medium':
        return {
          medication: 'Medium-risk medication and symptom tracking are advised. Regular check-ups are recommended. Watch for symptoms like mild jaundice, nausea, and fatigue.',
          symptomTracking: 'Weekly monitoring of liver function tests and symptoms. Maintain a health diary to track any changes in your condition.'
        };
      case 'low':
        return {
          medication: 'Low-risk medication is advised. Maintain a healthy lifestyle with a balanced diet and regular exercise. Annual check-ups are recommended.',
          symptomTracking: 'Periodic monitoring of liver function and overall health. Keep track of any new symptoms or changes in health.'
        };
      default:
        return {
          medication: 'Consult with a healthcare provider for further evaluation and guidance based on your specific condition.',
          symptomTracking: 'Follow general health advice and consult with a healthcare provider if symptoms develop or change.'
        };
    }
  };

  const { medication, symptomTracking } = getMedicationAndTracking(riskValue);

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
            <Link to='/doctor' className="sidebar-item">Home</Link>
            <Link to='/prediction' className="sidebar-item">Prediction</Link>
            <Link to="/admin" className="sidebar-item">Patient Details</Link>
          </div>
          <div className="navbar-links">
            <Link to='/doctor' className="navbar-item">Home</Link>
            <Link to='/prediction' className="navbar-item">Prediction</Link>
            <Link to="/admin" className="navbar-item">Patient Details</Link>
          </div>
        </div>
      </nav>
      <div className="result-container">
        <h1 className="result-heading">Prediction Result</h1>
        <div className="patient-info">
          <h2 className="info-heading">Patient Information</h2>
          <p className="info-item">Name: {name}</p>
          <p className="info-item">Age: {age}</p>
          <p className="info-item">Gender: {gender}</p>
        </div>
        <div className="prediction-result">
          <h2 className="result-heading">Prediction</h2>
          <p className="prediction-text">Your liver disease risk is: {riskValue.charAt(0).toUpperCase() + riskValue.slice(1)}</p>
          <div className="recommendations-container">
            <div className="recommendation-column">
              <h3 className="recommendation-heading">Medication</h3>
              <p className="recommendation-text">{medication}</p>
            </div>
            <div className="recommendation-column">
              <h3 className="recommendation-heading">Symptom Tracking</h3>
              <p className="recommendation-text">{symptomTracking}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;



