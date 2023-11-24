import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

export default function FreeTrial() {
  return (
    <div className="flex flex-row items-center py-12 justify-around" style={{backgroundColor:'#AEE5D8'}}>
      <div>
        <h2 className="text-5xl">Start your free <br /> website trail today</h2>
        <div className="gap-6 py-2">
          <p>No credit card required. Cancel anytime</p>
        </div>
      </div>
      
      <div>
        <h2 className="font-bold">24/7 Support</h2>
        <div className="border-2 border-black p-4 w-[20vw]">
          <h4>Help Center</h4>
          <p>Get help from our Customer care Team</p>
          
          <NavLink to="/pricing" className="font-bold text-slate-200 text-3xl">
            <Button className="jellyButtonNavBar">Pricing <FaArrowRightLong /></Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
