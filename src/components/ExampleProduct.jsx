import React, { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { ScrollContainer, ScrollPage } from "react-scroll-motion";
import Lottie from "lottie-react";
import sun from "../assets/animations/Sun.json";

gsap.registerPlugin(ScrollTrigger);

const ExampleProduct = () => {
  const [sunTranslation, setSunTranslation] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#333131");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const translation = scrollPosition * 0.1;
      setSunTranslation(translation);
     
    };

    ScrollTrigger.create({
      trigger: ".text0",
      scrub: true,
      start: "top 20%",
      end: "bottom 80%",
      animation: gsap.to(".text0", {
        x: "40%",
        rotate: 20,
        duration: 0.85,
      }),
    });

    ScrollTrigger.create({
      trigger: ".text1",
      scrub: true,
      start: "top 30%",
      end: "bottom 70%",
      animation: gsap.to(".text1", {
        x: "-40%",
        rotate: -20,
        duration: 0.85,
      }),
    });

    ScrollTrigger.create({
      trigger: ".text2",
      scrub: true,
      start: "top 40%",
      end: "bottom 60%",
      animation: gsap.to(".text2", {
        x: "40%",
        rotate: 20,
        duration: 0.85,
      }),
    });

    ScrollTrigger.create({
      trigger: ".text3",
      scrub: true,
      start: "top 40%",
      end: "bottom 60%",
      animation: gsap.to(".text3", {
        x: "-40%",
        rotate: -20,
        duration: 0.85,
      }),
    });


 

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sunStyle = 
  windowWidth > 1440 ? { 
    width: "2000px",
    marginLeft: "0",
    marginTop: `calc(-400vh + ${sunTranslation}vh)`} : 
  
  windowWidth <= 1440 ? {  
    width: "2000px",
    marginLeft: "0",
    marginTop: `calc(-350vh + ${sunTranslation}vh)`} : { /* Default styles */ };


  return (
    <ScrollContainer>
      <ScrollPage
        style={{
          height: "150vh",
          overflowY: "hidden",
        }}
      >
        <div
          className="relative flex items-start justify-center overflow-x-hidden"
          id="animated-text-section"
          style={{
            backgroundColor: '#333131',
            width: "100vw",
            height: "150vh",
            fontFamily: "Pilated",
            overflowY: "hidden",
          }}
        >
          <Lottie
            animationData={sun}
            className="z-50 absolute sunSetting2"
            style={{
             ...sunStyle,
              zIndex: 50,
            }}
          />

          <div className="mt-20 mr-20 z-50">
            <div className="text0">Our Work</div>
            <div className="text1">Our Work</div>
            <div className="text2">Our Work</div>
            <div className="text3">Our Work</div>
          </div>
        </div>
      </ScrollPage>
    </ScrollContainer>
  );
};

export default ExampleProduct;
