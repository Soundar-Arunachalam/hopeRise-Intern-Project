import { Link } from "react-router-dom";


export default function OnlineConsultNav(){
return (
    <>
    <div className="container flex gap-20 m-10 mt-20">
        <div className="item ">
            <img className="w-64" src="/periods.webp"/>
            <p className="text-sm text-center m-3">Period Doubts Or Pregnancy</p>
             <Link className="text-sm text-center m-3 text-sky-500 font-semibold" to="#">Consult Now</Link>
        </div>
        <div className="item">
            <img src="/Acne.webp" alt="" />
            <p className="text-sm text-center m-3">Acne,Pimples or Skin Issues</p>
            <Link className="text-sm text-center m-3 text-sky-500 font-semibold" to="#">Consult Now</Link>
        </div>
        <div className="item">
            <img className="w-64" src="/performance.svg" alt="" />
            <p className="text-sm text-center m-3">Performance issues in bed</p>
            <Link className="text-sm text-center m-3 text-sky-500 font-semibold" to="#">Consult Now</Link>
        </div>
        <div className="item">
            <img src="/Cold.webp" alt="" />
            <p className="text-sm text-center m-3">Cold,Cough or Fever</p>
            <Link className="text-sm text-center m-3 text-sky-500 font-semibold" to="#">Consult Now</Link>
        </div>
        <div className="item">
            <img src="/Depression.webp" alt="" />
            <p className="text-sm text-center m-3">Child Not Feeling Well</p>
            <Link className="text-sm text-center m-3 text-sky-500 font-semibold" to="#">Consult Now</Link>
        </div>
        <div className="item">
            <img className="w-64" src="/Child.svg" alt="" />
            <p className="text-sm text-center m-3">Depression Or Anxiety</p>
            <Link className="text-sm text-center m-3 text-sky-500 font-semibold" to="#">Consult Now</Link>
        </div>
    </div>
    </>
);
}