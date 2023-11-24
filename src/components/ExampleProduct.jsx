import { Image } from "@nextui-org/react";
import DScreenB from "../assets/images/3DShape3.jpg";
import Image1 from "../assets/images/Image1.png";
import Image2 from "../assets/images/Image2.jpg";
import {useState } from "react";
import Lottie from "lottie-react";
import sun from "../assets/animations/Sun.json";

export default function ExampleProduct() {
    const [isHovered, setHovered] = useState(false);
   
    

    return (
        <>
            <div
                className="relative w-full h-[250vh] flex px-16 overflow-hidden glassCardDark flex flex-col"
                style={{
                    backgroundImage: `url(${DScreenB})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginTop: "0",
                    overflowY: "auto",
                   transform: 'scaleY(-1)',
                }}
            >
                
             <Lottie
                            animationData={sun}
                            style={{
                                width: "100px",
                                marginLeft: "45vw",
                            }}
                        /> 
                <div
                  className="z-50 absolute"
                    style={{  transform: 'scaleY(-1)',top:'40vh'}}
                >
                        <h1 className="text-4xl font-bold z-50 text-white" style={{fontFamily:'Pilated', fontSize:'10rem'}}>Our Work</h1>
                        <div className='flex flex-col items-start'>    <Image
                        src={isHovered ? Image2 : Image1}
                        className={isHovered ? "hovered" : ""}
                        style={{
                            width: "40vw",
                            height: "70vh",
                            transition: "opacity 0.5s ease-in-out",
                        }}
                    />
                    <p  className='z-50 text-white' style={{
                                    fontFamily: "Pilated",
                                    fontSize: "9rem",
                                    marginTop: "-30vh",
                                    
                                }}>Blog</p></div>
                    <div className='flex flex-col items-start' style={{marginLeft:'50vw'}} >    <Image
                        src={isHovered ? Image2 : Image1}
                        className={isHovered ? "hovered" : ""}
                        style={{
                            width: "40vw",
                            height: "70vh",
                            transition: "opacity 0.5s ease-in-out",
                        }}
                    />
                    <p  className='z-50 text-white' style={{
                                    fontFamily: "Pilated",
                                    fontSize: "6rem",
                                    marginTop: "-30vh",
                                    
                                }}> 
                                E-commerce
                                </p>
                                </div>
                    <div className='flex flex-col items-end'>    <Image
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
        </>
    );
}
