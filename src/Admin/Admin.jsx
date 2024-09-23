import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import {HiMenu, HiX } from "react-icons/hi";
// import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import './Admin.css';
import Aos from 'aos';
import 'aos/dist/aos.css'

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [editedRecord, setEditedRecord] = useState({ name: '',  age: '', date: '',  username: '', email: '', password: '', role: '' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(()=>{
    Aos.init()
})



  useEffect(() => {
    axios.get('http://localhost:8081/admin')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error('Error connecting to database:', err);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/delete/${id}`)
      .then(response => {
        setData(data.filter(row => row.id !== id));
        console.log("Successfully deleted:", response.data);
      })
      .catch(err => {
        console.error("Error deleting the data:", err);
      });
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    setEditedRecord({ name: record.name, age: record.age, date: record.date, username: record.username, email: record.email, password: record.password, role: record.role });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentRecord(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveChanges = () => {
    axios.put(`http://localhost:8081/update/${currentRecord.id}`, editedRecord)
      .then(response => {
        setData(data.map(row => (row.id === currentRecord.id ? { ...row, ...editedRecord } : row)));
        handleDialogClose();
      })
      .catch(err => {
        console.error("Error updating the data:", err);
      });
  };
   
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(row => 
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.age.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.password.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

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
    <div className="container">
      <TableContainer component={Paper} className="table-container" data-aos="zoom-in-up" data-aos-duration="2000">
      <Typography variant="h4" className="table-title">
        User Data
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        onChange={handleSearchChange}
        value={searchTerm}
        InputProps={{
          // startAdornment: (
          //   <InputAdornment position="start">
          //     <SearchIcon />
          //   </InputAdornment>
          // )
        }}
        style={{ margin: '10px auto', display: 'block', maxWidth: 900 }}
      />
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} className="table-row">
                <TableCell component="th" scope="row" className="table-cell">
                  {row.id}
                </TableCell>
                <TableCell align="right" className="table-cell">{row.name}</TableCell>
                <TableCell align="right" className="table-cell">{row.age}</TableCell>
                <TableCell align="right" className="table-cell">{row.date}</TableCell>
                <TableCell align="right" className="table-cell">{row.username}</TableCell>
                <TableCell align="right" className="table-cell">{row.email}</TableCell>
                <TableCell align="right" className="table-cell">{row.password}</TableCell>
                <TableCell align="right" className="table-cell">{row.role}</TableCell>
                <TableCell align="right" className="table-cell">
                  <Button
                    variant="contained"
                    className="button button-delete"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    className="button button-edit"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle className="dialog-title">Edit Record</DialogTitle>
        <DialogContent className="dialog-content">
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={editedRecord.name}
            onChange={handleEditChange}
            className="text-field"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            name="age"
            value={editedRecord.age}
            onChange={handleEditChange}
            className="text-field"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            name="date"
            value={editedRecord.date}
            onChange={handleEditChange}
            className="text-field"
          />
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            name="username"
            value={editedRecord.username}
            onChange={handleEditChange}
            className="text-field"
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={editedRecord.email}
            onChange={handleEditChange}
            className="text-field"
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={editedRecord.password}
            onChange={handleEditChange}
            className="text-field"
          />
          <TextField
            margin="dense"
            label="Role"
            type="text"
            fullWidth
            name="role"
            value={editedRecord.role}
            onChange={handleEditChange}
            className="text-field"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
};

export default Admin;


