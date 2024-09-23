import React, { useState } from 'react';
import { Button, Container, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';





const sessions = [
    "Morning (9 AM - 12 PM)",
    "Afternoon (12 PM - 3 PM)",
    "Evening (3 PM - 6 PM)"
  ];
const Booking = () => {

        const [sidebarOpen, setSidebarOpen] = useState(false);
        const [formData, setFormData] = useState({
          name: '',
          number: '',
          username: '',
          email: '',
          date: '',
          session: ''
        });

        const handleChange = (event) => {
            const { name, value } = event.target;
            setFormData(prevState => ({
              ...prevState,
              [name]: value
            }));
          };
        
          const handleSubmit = (event) => {
            event.preventDefault();
            // Handle form submission logic here
            console.log('Form data submitted:', formData);
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
            <Link to='/patient'  className="sidebar-item">Home</Link>
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
         <section className="appointment-section">
  <img src="/images/doc4.gif" alt="" className="side" />
  <Container maxWidth="xs" className="appointment-form-container">
    {/* <Typography variant="h4" gutterBottom className="form-title">
      Book an Appointment
    </Typography> */}
    <form onSubmit={handleSubmit}>
      <h1>Book An Appointment</h1>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Phone Number"
        name="number"
        type="tel"
        value={formData.number}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Date"
        name="date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.date}
        onChange={handleChange}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Session</InputLabel>
        <Select
          name="session"
          value={formData.session}
          onChange={handleChange}
        >
          {sessions.map((session, index) => (
            <MenuItem key={index} value={session}>{session}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className="submit-button"
      >
        Book Appointment
      </Button>
    </form>
  </Container>
</section>
   </>
  )
}

export default Booking