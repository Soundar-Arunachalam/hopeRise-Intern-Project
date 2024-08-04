import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
export default function User(){
    const [user,setUser]=useState(null);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        console.log(loggedInUser);
        if (loggedInUser) {
         
          setUser(...loggedInUser);
        }
      }, []);
    const {id}=useParams();
    return (
        <>
        <div className="shadow-2xl rounded-lg aspect-square">
        <h1 className=" font-mono text-lg font-semibold text-slate-500">user:{id}</h1>
        </div>
        {user&&<div className="mt-4">you have succesfully logged in {user.name}</div>

        }
        </>
    )
}