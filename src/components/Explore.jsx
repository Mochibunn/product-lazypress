import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
export default function Explore() {
  return (
    <div className="flex p-14">
      <h2 className="text-5xl">Website templates for every purpose</h2>
      <div className="flex flex-col gap-6 pl-12 py-2">
        <p>
          Start with a flexible designer template or build your own,<br></br>{" "}
          then customize to fit your style and professional needs using our
          drag-and-drop website builder.
        </p>
        <NavLink to="/" className="font-bold text-slate-200 text-3xl">
          <Button className="jellyButtonNavBar">
            Get Started <GoArrowRight />
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
