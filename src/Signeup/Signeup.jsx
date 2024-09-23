import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css'
import axios from 'axios';
// import { Link } from 'react-router-dom';


const Signeup = () => {

    useEffect(()=>{
        Aos.init()
    })
    const [formdata, setFormdata] = useState({
        name: '',
        age:'',
        date:'',
        username: '',
        email: '',
        password: '',
        confirmPassword: '' ,
        role:''
    });

    const [error, setError] = useState(''); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formdata.password !== formdata.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        axios.post('http://localhost:8081/signup', {
            name: formdata.name,
            age: formdata.age,
            date: formdata.date,
            username: formdata.username,
            email: formdata.email,
            password: formdata.password,
            role: formdata.role
        })
        .then(response => {
            console.log('Data created', response.data);
            setFormdata({
                name: '',
                age:'',
                date:'',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                role:''
            });
            setError(''); 
            navigate('/');
            alert('Successfully signed up');
        })
        .catch(err => {
            console.error('Error inserting the data:', err.response);
            setError('Error inserting data. Please try again.'); 
        });
    };

    return (
        <>
            <div className='container'>         
                <form action='' onSubmit={handleSubmit} data-aos="fade-up"     data-aos-duration="1000" >
                    <h1>Sign Up</h1>
                    {error && <div className='error-message'>{error}</div>} 
                    <div className='form-group'>
                        <label>Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='name'
                            value={formdata.name}
                            onChange={handleChange}
                            placeholder='Name'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Age</label>
                        <input
                            type='age'
                            className='form-control'
                            name='age'
                            value={formdata.age}
                            onChange={handleChange}
                            placeholder='Age'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Date</label>
                        <input
                            type='date'
                            className='form-control'
                            name='date'
                            value={formdata.date}
                            onChange={handleChange}
                            placeholder='Date'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>User Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='username'
                            value={formdata.username}
                            onChange={handleChange}
                            placeholder='Username'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input
                            type='email'
                            className='form-control'
                            name='email'
                            value={formdata.email}
                            onChange={handleChange}
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input
                            type='password'
                            className='form-control'
                            name='password'
                            value={formdata.password}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Confirm Password</label>
                        <input
                            type='password'
                            className='form-control'
                            name='confirmPassword'
                            value={formdata.confirmPassword}
                            onChange={handleChange}
                            placeholder='Confirm Password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Role</label>
                        <input
                            type='text'
                            className='form-control'
                            name='role'
                            value={formdata.role}
                            onChange={handleChange}
                            placeholder='role'
                            required
                        />
                    </div>
                    <button className='btn' type="submit">Sign Up</button>
                    <a href='/'>Back to Login</a>
                </form>
            </div>
        </>
    );
}

export default Signeup;

