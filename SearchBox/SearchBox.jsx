import "../index.css"
import React,{useState} from "react";
import { useRef } from 'react';
import {Helmet} from "react-helmet";

import "/Users/rsss/Desktop/Web Development/react learning/reactlearning/src/SearchBox/search.css"
export default function SearchBox(){
  const [open,setOpen]=useState(false);

return(<> 

<div class="container1">
        <h2>Find Doctor by Locality</h2>
        <form id="searchForm">
            <label for="search">Search (Name, Specialization, Establishment Name, Establishment City):</label>
            <input type="text" id="search" name="search" required/>
            <button type="submit">Search</button>
        </form>

        <div class="doctor-details" id="doctorDetails">
       
        </div>
    </div>

    
    <div id="appointmentModal" className="modal">
        <div className="modal-content">
            <span class="close">&times;</span>
            <h2>Book Appointment</h2>
            <form id="appointmentForm">
                <input type="hidden" id="doctorId" name="doctorId"/>
                <input type="hidden" id="doctorName" name="doctorName"/>
                <input type="hidden" id="establishmentName" name="establishmentName"/>
                <input type="hidden" id="bookedTiming" name="bookedTiming"/>
                <label for="name">Your Name:</label>
                <input type="text" id="name" name="name" required/>
                <label for="phoneNumber">Phone Number:</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" required/>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required/>
                <label for="reason">Reason for Appointment:</label>
                <textarea id="reason" name="reason" rows="4" required></textarea>
                <label for="timing">Preferred Timing:</label>
                <select id="timing" name="timing" required>
                <div id="calendar"></div>
                
                </select>
                <button type="submit">Submit Appointment</button>
            </form>
        </div>
    </div>
    <Helmet>
    <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js"/>
    <script src="/Users/rsss/Desktop/Web Development/react learning/reactlearning/src/SearchBox/search.js"></script>
    </Helmet>
    
        </>
        );
     
        
    
       
  
};

function DropDownItem({locations}){
  

  const inputRef = useRef(null);
  function handleClick(e){
    e.preventDefault();
    inputRef.innerHTML={locations};
    }
  return(
    <>
   
    <button className="dropdown-item" onClick={handleClick}>
    <h1 >{locations}</h1>
    </button>
    </>
  );
}