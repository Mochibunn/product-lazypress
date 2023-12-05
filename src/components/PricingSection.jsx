import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";


export default function PricingSection () {
return (
<>
<div className="text-center bg-[#333131] h-[100vh] flex items-center justify-center flex-col  text-[#fffff1]">  
  <h2 className="text-5xl">Start your free website trial today</h2>
  <p className="py-1">No credit card required. Cancel anytime</p>
  <div className="flex flex-col items-center text-center">
  <h2 className="font-bold mb-4">24/7 Support</h2>
  <div className="p-4 w-[20vw]  flex flex-col items-center text-center border">
    <h4>Help Center</h4>
    <p>Get help from our Customer Team</p>
    
    <NavLink to="/pricing" className="font-bold text-slate-200 text-3xl mt-4">
      <Button className="glassButton" style={{color:'#fffff1'}}>Pricing</Button>
    </NavLink>
  </div>
</div>

</div>


</>
)
}



