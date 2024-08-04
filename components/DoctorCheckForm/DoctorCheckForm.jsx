import React, { useState } from 'react';
import axios from 'axios';

function DoctorCheckForm() {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    address: '',
    phone: '',
    email: '',
    city:'',
    photo: null,
    license: null
  });

let specialization=["Accident and emergency medicine",
"Allergist",
  "Anaesthetics",
  "Cardiology",
  "Child psychiatry",
  "Clinical biology",
  "Clinical chemistry",
  "Clinical microbiology",
  "Clinical neurophysiology",
  "Craniofacial surgery",
  "Dermatology",
  "Endocrinology",
  "Family and General Medicine",
  "Gastroenterologic surgery",
  "Gastroenterology",
  "General Practice",
  "General surgery",
  "Geriatrics",
  "Hematology",
  "Immunology",
  "Infectious diseases",
  "Internal medicine",
  "Laboratory medicine",
  "Nephrology",
  "Neuropsychiatry",
  "Neurology",
 "Neurosurgery",
  "Nuclear medicine",
  "Obstetrics and gynaecology",
  "Occupational medicine",
  "Oncology",
  "Ophthalmology",
  "Oral and maxillofacial surgery",
  "Orthopaedics",
 "Otorhinolaryngology",
  "Paediatric surgery",
  "Paediatrics",
  "Pathology",
  "Pharmacology",
  "Physical medicine and rehabilitation",
  "Plastic surgery",
  "Podiatric surgery",
  "Preventive medicine",
  "Psychiatry",
  'Public health',
  'Radiation Oncology',
  'Radiology',
  'Respiratory medicine',
  'Rheumatology',
  'Stomatology',
  'Thoracic surgery',
 ' Tropical medicine',
  'Urology',
 'Vascular surgery',
  'Venereology'];
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = function(e) {
    const { name, files } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/doctor/signup', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Form submitted successfully!');
      // Reset form
      setFormData({
        name: '',
        specialization: '',
        experience: '',
        address: '',
        phone: '',
        email: '',
        password:'',
        photo: null,
        license: null
      });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="min-h-screen bg-light-orange py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-orange">
                <h2 className="leading-relaxed">Doctor/Clinic Information Form</h2>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="px-4 py-2 border focus:ring-orange focus:border-orange block w-full sm:text-sm border-gray-300 rounded-md" required />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Specialization</label>
                  <select type="text" id="select" name="specialization" value={formData.specialization} onChange={handleChange} className="bg-white border border-gray-300 rounded-md p-2 text-gray-700 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" required >
                     {specialization.map(val=>{return(<option value={val}>{val}</option>)})}
                     
           </select>
                
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Years of Experience</label>
                  <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="px-4 py-2 border focus:ring-orange focus:border-orange block w-full sm:text-sm border-gray-300 rounded-md" required />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Clinic Address</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} className="px-4 py-2 border focus:ring-orange focus:border-orange block w-full sm:text-sm border-gray-300 rounded-md" required></textarea>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="px-4 py-2 border focus:ring-orange focus:border-orange block w-full sm:text-sm border-gray-300 rounded-md" required />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="px-4 py-2 border focus:ring-orange focus:border-orange block w-full sm:text-sm border-gray-300 rounded-md" required />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="px-4 py-2 border focus:ring-orange focus:border-orange block w-full sm:text-sm border-gray-300 rounded-md" required />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">city</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className="px-4 py-2 border focus:ring-orange focus:border-orange block w-full sm:text-sm border-gray-300 rounded-md" required />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Doctor's Photo</label>
                  <input type="file" name="photo" onChange={handleFileChange} accept="image/*" className="px-4 py-2 border focus:ring-orange focus:border-orange block w-full sm:text-sm border-gray-300 rounded-md" required />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Medical License Document</label>
                  <input type="file" name="license"  onChange={handleFileChange} accept=".pdf,.doc,.docx" className="px-4 py-2 border focus:ring-orange focus:border-orange block w-full sm:text-sm border-gray-300 rounded-md" required />
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button className="bg-orange flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Submit</button>
              </div>
              <div className="pt-4 flex items-center space-x-4">
           <button type="submit" className="bg-black flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-orange-600 transition duration-300 ease-in-out">
          Submit
         </button>
</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorCheckForm;
function Options({value}){


  

  <option value={value}>{value}</option>


}