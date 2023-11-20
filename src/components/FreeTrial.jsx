import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

export default function FreeTrial() {
  return (
    <div className="flex gap-6 pl-12 py-2">
      <div>
        <div>
          <h2 className="text-5xl">Start your free website trail today</h2>
        </div>
        <div className="flex flex-col gap-6  py-2">
          <p>No credit card required. Cancel anytime</p>
          <NavLink to="/" className="font-bold text-slate-200 text-3xl">
            <Button color="primary">Get Started</Button>
          </NavLink>
        </div>
      </div>
      <div>
        <h2 className="font-bold">24/7 Support</h2>
        <div className="border-2 border-black p-4">
          <h4>Help Center</h4>
          <p>Get help from our Customer care Team</p>
          <FaArrowRightLong />
        </div>
      </div>
    </div>
  );
}
