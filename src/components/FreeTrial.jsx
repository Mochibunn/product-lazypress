import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

export default function FreeTrial() {
  return (
    <div className="flex flex-col items-center py-12 justify-around" style={{backgroundColor:'#AEE5D8'}}>
      <div>
        <h2 className="text-5xl">Start your free website trail today</h2>
        <div className="gap-6 py-1 text-center">
          <p>No credit card required. Cancel anytime</p>
        </div>
      </div>
      
      <div>
        <h2 className="font-bold">24/7 Support</h2>
        <div className=" p-4 w-[20vw] glassCardSmall flex flex-col items-center text-center">
          <h4>Help Center</h4>
          <p>Get help from our Customer Team</p>
          
          <NavLink to="/pricing" className="font-bold text-slate-200 text-3xl">
            <Button className="jellyButtonNavBar">Pricing <FaArrowRightLong /></Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
