import { Button } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import animationData from '../assets/animations/sleepingCat.json';
import moon from '../assets/animations/Moon.json';
import sun from '../assets/animations/Sun.json';
import bgImage from '../assets/images/LandingBG.png';
import morningImage from '../assets/images/MorningBG.jpg';
import { Animator, MoveOut, ScrollContainer, ScrollPage,batch,FadeIn,MoveIn } from 'react-scroll-motion';

export default function HeroBanner() {

  const [moonRotation, setMoonRotation] = useState(0);
  const [moonTranslation, setMoonTranslation] = useState(0);
  

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Adjust the rotation speed and direction as needed
      const rotation = scrollPosition * 0.5; 
      const translation = scrollPosition * 0.1;
      setMoonRotation(rotation);
      setMoonTranslation(translation);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
    <ScrollContainer>
      <ScrollPage  style={{ height: '150vh', overflow: 'hidden', marginTop:'-9vh' }}>
      <Animator animation={FadeIn()}>
        <div
          className="w-screen h-[150vh] overflow-hidden"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            marginTop: '-9vh',
            transition: 'transform 0.3s ease',
          }}
        >
            <Lottie animationData={moon} style={{zIndex:'1000',width:'500px',marginLeft:'50vw', marginTop: `calc(3vh + ${moonTranslation}vh)`,
                transform: `rotate(${moonRotation}deg)`}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-100 flex justify-between items-center gap-10" style={{marginTop:'-20vh'}}>
            <Animator animation={batch(MoveOut(-1500, -1500))}>
          
              <div className="neon-text-container flex flex-col justify-between gap-3">
                <h1 className="text-6xl font-extrabold tracking-wide neon-text" style={{ textAlign: 'initial', fontFamily: 'Nick', fontSize: '8rem' }}>
                  You Sleep <br /> We Code
                </h1>
                <Lottie animationData={animationData} style={{ width: '200px', zIndex: '1000' }} />
                <Button className="buttonGSGradient neonBoxShadow" style={{ marginTop: '-6vh' }}>Get Started</Button>
              </div>
            </Animator>
          </div>
        </div>
        </Animator>
      </ScrollPage>
    </ScrollContainer>
    <ScrollContainer>
      <ScrollPage  style={{ height: '150vh', overflow: 'hidden', marginTop:'-9vh' }}>

      <div
          className="w-screen h-[150vh] overflow-hidden"
          style={{
            backgroundImage: `url(${morningImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            marginTop: '-9vh',
            transition: 'transform 0.3s ease',
            transform: 'scaleY(-1)',
          }}
        >
          <Lottie animationData={sun} style={{zIndex:'1000',width:'1000px',marginLeft:'50vw', marginTop: `calc(10vh + ${moonTranslation}vh)`}}/>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-100 flex justify-between items-center gap-10" style={{marginTop:'-20vh'}}>
            <Animator animation={batch(MoveIn(50, 50))}>
          
              <div className="neon-text-container flex flex-col justify-between gap-3">
                <h1 className="text-6xl font-extrabold tracking-wide neon-text" style={{ textAlign: 'initial', fontFamily: 'Nick', fontSize: '8rem' }}>
                  You Sleep <br /> We Code
                </h1>
                <Lottie animationData={animationData} style={{ width: '200px', zIndex: '1000' }} />
                <Button className="buttonGSGradient neonBoxShadow" style={{ marginTop: '-6vh' }}>Get Started</Button>
              </div>
            </Animator>
          </div>
        
      </ScrollPage>
    </ScrollContainer>

     
     
  </>
  );
}
