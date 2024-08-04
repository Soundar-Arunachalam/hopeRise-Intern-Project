export default function InClinicVisitNavbar(){
    return (
       <>
       <div className="flex gap-5 mb-10">
        <div className="item">
            <img className="rounded-lg"src="/Dentist.jpg" alt="" />
            <h1 classname="font-semibold">Dentist</h1>
            <p className=" text-xs">Teething Troubles?Schedule a dental checkup</p>
        </div>
        <div className="item">
            <img className="rounded-lg"src="/Gynaecologists.jpg" alt="" />
            <h1 classname="font-semibold">Gynaecologists</h1>
            <p className=" text-xs">Explore for womens health,pregnancy and infertility treaments</p>
        </div>
        <div className="item">
            <img className="rounded-lg"src="/Dietition.jpg" alt="" />
            <h1 classname="font-semibold">Dietitian/Nutrition</h1>
            <p className=" text-xs">Get Guidance on Diets</p>
        </div>
        <div className="item">
            <img className="rounded-lg"src="Physiotherapist.jpg" alt="" />
            <h1 classname="font-semibold">Physiotherapists</h1>
            <p className=" text-xs">Pulled a muscle?Get it treated by a trained physiotherapists</p>
        </div>
       </div>
       </> 
    );
}