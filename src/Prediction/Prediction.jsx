import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from "react-icons/hi";
import Button from '@mui/material/Button';
import './Prediction.css';

const Prediction = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    totalBilirubin: '',
    directBilirubin: '',
    alkalinePhosphotase: '',
    alamineAminotransferase: '',
    aspartateAminotransferase: '',
    totalProteins: '',
    albumin: '',
    albuminGlobulinRatio: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateRisk = (data) => {
    const {
      age,
      totalBilirubin,
      directBilirubin,
      alkalinePhosphotase,
      alamineAminotransferase,
      aspartateAminotransferase,
      totalProteins,
      albumin,
      albuminGlobulinRatio
    } = data;

    let risk = 'low';

    // Adjust risk calculation based on age
    const ageThresholdHigh = 60; // Example threshold for high risk based on age
    const ageThresholdMedium = 40; // Example threshold for medium risk based on age

    if (age > ageThresholdHigh || 
        totalBilirubin > 1.2 || directBilirubin > 0.3 || alkalinePhosphotase > 120 ||
        alamineAminotransferase > 40 || aspartateAminotransferase > 40 ||
        totalProteins < 6.0 || albumin < 3.5 || albuminGlobulinRatio < 1.0) {
      risk = 'high';
    } else if ((age > ageThresholdMedium) ||
               totalBilirubin > 0.8 || directBilirubin > 0.2 ||
               alkalinePhosphotase > 100 || alamineAminotransferase > 30 ||
               aspartateAminotransferase > 30 || totalProteins < 6.5 ||
               albumin < 3.8 || albuminGlobulinRatio < 1.2) {
      risk = 'medium';
    }

    return risk;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const risk = calculateRisk(formData);
    // Store form data and risk in local storage
    localStorage.setItem('formData', JSON.stringify({ ...formData, risk }));
    navigate('/result');
  };

  return (
    <>
      <nav className="navbar" >
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
            <Button variant="contained" href="/">
        Login
      </Button>
          </div>
          <div className="navbar-links">
            <Link to='/doctor' className="navbar-item">Home</Link>
            <Link to='/prediction' className="navbar-item">Prediction</Link>
            <Link to="/admin" className="navbar-item">Patient Details</Link>
          </div>
        </div>
      </nav>
      <div>
        <h1 className='text-head'>Liver Disease Prediction</h1>
        <form className='text-form' onSubmit={handleSubmit}>
          <label className='text-lable'>Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label className='text-lable'>Age:
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </label>
          <label className='text-lable'>Gender:
            <select className='text-select' name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label className='text-lable'>Total Bilirubin:
            <input type="number" name="totalBilirubin" value={formData.totalBilirubin} onChange={handleChange} required />
          </label>
          <label className='text-lable'>Direct Bilirubin:
            <input type="number" name="directBilirubin" value={formData.directBilirubin} onChange={handleChange} required />
          </label>
          <label className='text-lable'>Alkaline Phosphotase:
            <input type="number" name="alkalinePhosphotase" value={formData.alkalinePhosphotase} onChange={handleChange} required />
          </label>
          <label className='text-lable'>Alamine Aminotransferase:
            <input type="number" name="alamineAminotransferase" value={formData.alamineAminotransferase} onChange={handleChange} required />
          </label>
          <label className='text-lable'>Aspartate Aminotransferase:
            <input type="number" name="aspartateAminotransferase" value={formData.aspartateAminotransferase} onChange={handleChange} required />
          </label>
          <label className='text-lable'>Total Proteins:
            <input type="number" name="totalProteins" value={formData.totalProteins} onChange={handleChange} required />
          </label>
          <label className='text-lable'>Albumin:
            <input type="number" name="albumin" value={formData.albumin} onChange={handleChange} required />
          </label>
          <label className='text-lable'>Albumin/Globulin Ratio:
            <input type="number" name="albuminGlobulinRatio" value={formData.albuminGlobulinRatio} onChange={handleChange} required />
          </label>
          <button className='tex-btn' type="submit">Predict</button>
        </form>
      </div>
    </>
  );
};

export default Prediction;

