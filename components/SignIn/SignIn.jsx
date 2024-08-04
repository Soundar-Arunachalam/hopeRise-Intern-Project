// src/components/Login.js
import React, { useState } from 'react';
import DatePicker from "react-multi-date-picker"
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user); // Store user data in state or context
        localStorage.setItem('user', data.user)
        console.log('Login successful:', data);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const today = new Date()
  const tomorrow = new Date()

  tomorrow.setDate(tomorrow.getDate() + 1)

  const [values, setValues] = useState([today, tomorrow])
  return (<>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl mb-4">Login</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="w-full p-2 bg-orange-500 text-white rounded hover:bg-orange-600">
        Login
      </button>
      
      
    
    </form>
    
    <form action="">
    
   {userData&& <div class="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
  <div className="mt-4">Welcome, {userData.name}!</div>
    <h1 className="text-3xl">update slots</h1>
    <label for="datetime" class="block text-gray-700 font-semibold mb-2">Select Date and Time:</label>
    <input type="datetime-local" id="datetime" name="datetime" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />
    <DatePicker className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      multiple
      value={values} 
      onChange={setValues}
    />
  </div>}
    </form>
    </>
  );
};

export default Login;
