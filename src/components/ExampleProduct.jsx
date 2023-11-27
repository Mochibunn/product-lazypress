import { Image } from "@nextui-org/react";
import DShapeA from "../assets/images/3DShape1.jpg";
import Image1 from "../assets/images/Image1.png";
import Image2 from "../assets/images/Image2.jpg";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import sun from "../assets/animations/Sun.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExampleProduct() {
  const [isHovered, setHovered] = useState(false);
  const [moonTranslation, setMoonTranslation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const translation = scrollPosition * 0.15;

      setMoonTranslation(translation);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    gsap.to('.text0', {
      x: '20%',
      rotate: 10,
      duration: 0.85,
      scrollTrigger: {
        trigger: '.text0',
        scrub: true,
        start: 'top 20%'
      }
    });

    gsap.to('.text1', {
      x: '-20%',
      rotate: -10,
      duration: 0.85,
      scrollTrigger: {
        trigger: '.text1',
        scrub: true,
        start: 'top 30%'
      }
    });
  }, []);

  return (
    <>
      <div
        className="w-full h-[200vh] overflow-hidden"
        style={{
          backgroundImage: `url(${DShapeA})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "300vh",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(8px)",
            zIndex: 1,
          }}
        ></div>
        <Lottie
          animationData={sun}
          style={{
            zIndex: 1,
            width: "300px",
            marginLeft: "45vw",
            marginTop: `calc(10vh - ${moonTranslation}vh)`,
            zIndex: 50,
          }}
        />
        <div className="z-50 absolute flex items-center justify-center" style={{ top: '20vh' }}>
          <h1 className="text-4xl text0 font-bold z-50 text-white animate-text" style={{ fontFamily: 'Lemon Milk', fontSize: '10rem' }}>Our Work</h1>
          <h1 className="text-4xl font-bold z-50 text-white animate-text text1 " style={{ fontFamily: 'Lemon Milk', fontSize: '10rem' }}>Our Work</h1>


          <div className="z-50 absolute" style={{ top: '20vh' }}>
  <div className='flex flex-col items-end' style={{ marginRight: '-20vw' }}>
    <Image
      src={isHovered ? Image2 : Image1}
      className={isHovered ? "hovered" : ""}
      style={{
        width: "40vw",
        height: "70vh",
        transition: "opacity 0.5s ease-in-out",
      }}
    />
    <p className='z-50 text-white' style={{
      fontFamily: "RemBoy",
      fontSize: "9rem",
      marginTop: "-30vh",
    }}>Blog</p>
  </div>
  
  <div className='flex flex-col items-start' style={{ marginLeft: '-10vw' }}>
    <Image
      src={isHovered ? Image2 : Image1}
      className={isHovered ? "hovered" : ""}
      style={{
        width: "40vw",
        height: "70vh",
        transition: "opacity 0.5s ease-in-out",
      }}
    />
    <p className='z-50 text-white' style={{
      fontFamily: "RemBoy",
      fontSize: "6rem",
      marginTop: "-30vh",
    }}>
      E-commerce
    </p>
  </div>

  <div className='flex flex-col items-end' style={{ marginRight: '-20vw' }}>
    <Image
      src={isHovered ? Image2 : Image1}
      className={isHovered ? "hovered" : ""}
      style={{
        width: "40vw",
        height: "70vh",
        transition: "opacity 0.5s ease-in-out",
      }}
    />
    <p className='z-50 text-white' style={{
      fontFamily: "Pilated",
      fontSize: "6rem",
      marginTop: "-30vh",
    }}>Community Forum</p>
  </div>
</div>

        </div>
      </div>
    </>
  );
}
