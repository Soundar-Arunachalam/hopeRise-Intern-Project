import React from 'react';
import {Link} from 'react-router-dom';
import Card1 from '../Card/Card';
import OnlineConsultNav from '../OnlineConsultNav/OnlineConsultNav';
import SearchBox from '../../SearchBox/SearchBox';
import InClinicVisitNavbar from '../InClinicVisitNavbar/InClinicVisitNavbar';
import Comments from '../../Comments/Comments';
export default function Home() {
    return (
       <>
      <SearchBox/>
       <div className="flex gap-x-10 place-content-center">
       <Card1 title="Instant Video Consultation" body="connect within 60s" img="/doctor.jpeg"></Card1>
       <Card1 title="Find Doctors Near You" body="Confirmed appointments" img="/doctor2.jpeg"></Card1>
     
       
       </div>
       
       <div className="container">
       <h1 className="text-3xl mb-1">Consult top doctors online for any health concern</h1>
       <p className="text-sm">Private online consultations with verified doctors in all specialists</p>
       <OnlineConsultNav></OnlineConsultNav>
       </div>
       <div className="container">
       <h1 className="text-3xl  mt-20 mb-1">Book an appointment for an in-clinic consultation
       </h1>
       <p className="text-sm mb-10">Find experienced doctors across all specialties</p>
        <InClinicVisitNavbar/>
       </div>
       <div className="container">
    
       </div>
       
       </>
    );
}