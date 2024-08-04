// src/components/Signup.js
import React, { useState } from 'react';

const Signup = () => {
  const [userType, setUserType] = useState('doctor');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    experience: '',
    age: '',
    medicalHistory: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            console.log('User created successfully');
          } else {
            console.error('Error creating user');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
 

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl mb-4">Signup</h2>
      <div className="mb-4">
        <label className="block text-gray-700">User Type</label>
        <select
          name="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        >
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>
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
      {userType === 'doctor' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Experience (years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
        </>
      )}
      {userType === 'patient' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Medical History</label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
        </>
      )}
      <button
        type="submit"
        className="w-full p-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Signup
      </button>
    </form>
  );
};

export default Signup;
