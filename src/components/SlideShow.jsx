//import OurWork from '../assets/images/OurWork.jpg';
//import DShapeA from '../assets/images/3DShape1.jpg';
import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const SlideShow = () => {
  return (
    <div className="landing-section relative flex flex-wrap"
    style={{height:'300vh'}}>
      <article className="gallery-article">
        <figure className="gallery-figure w-[100vw]"
         style={{backgroundColor:'#333131'}}>
          <img  alt="" style={{width:'100vw'}}/>
        </figure>
        <section className="gallery-section "
        style={{backgroundColor:'#333131'}}>
          <div className="gallery-content glassCard text-center flex items-center">
          <div className="py-12 flex flex-col items-center justify-center h-full ">
        <div className="text-center mb-6">
          <h2 className="text-5xl">Start your free website trail today</h2>
          <p className="py-1">No credit card required. Cancel anytime</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <h2 className="font-bold mb-4">24/7 Support</h2>
          <div className="p-4 w-[20vw]  flex flex-col items-center text-center">
            <h4>Help Center</h4>
            <p>Get help from our Customer Team</p>
            
            <NavLink to="/pricing" className="font-bold text-slate-200 text-3xl mt-4">
              <Button className="glassButton">Pricing <FaArrowRightLong /></Button>
            </NavLink>
          </div>
        </div>
      </div>
          </div>
        </section>
      </article>
    </div>
  );
};

export default SlideShow;
