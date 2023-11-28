import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import DShapeA from "../assets/images/3DShape1.jpg";

export default function FreeTrial() {
  return (
    <div
      className="w-full h-[40vh] overflow-hidden "
      style={{
        backgroundImage: `url(${DShapeA})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        transition: "transform 0.3s ease",
        position: "relative",
        top:'-10vh'
      }}
    >
      <div className="py-12 flex flex-col items-center justify-center h-full">
        <div className="text-center mb-6">
          <h2 className="text-5xl">Start your free website trail today</h2>
          <p className="py-1">No credit card required. Cancel anytime</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <h2 className="font-bold mb-4">24/7 Support</h2>
          <div className="p-4 w-[20vw] glassCardSmall flex flex-col items-center text-center">
            <h4>Help Center</h4>
            <p>Get help from our Customer Team</p>
            
            <NavLink to="/pricing" className="font-bold text-slate-200 text-3xl mt-4">
              <Button className="jellyButtonNavBar">Pricing <FaArrowRightLong /></Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
