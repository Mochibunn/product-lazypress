import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
export default function Explore() {
    return (
        <div className="flex p-14 flex-col justify-center items-center" >
            <h2 className="text-5xl">Website templates for every purpose</h2>
            <div className="flex flex-col  justify-center items-center">
                <p>
                    Start with a flexible designer template or build your own,
                    then customize to fit your style and professional
                    needs using our drag-and-drop website builder.
                </p>
                <NavLink to="/contactus" className="font-bold text-slate-200 text-3xl">
                    <Button className="jellyButtonNavBar">
                       Contact Us <GoArrowRight />
                    </Button>
                </NavLink>
            </div>
        </div>
    );
}
