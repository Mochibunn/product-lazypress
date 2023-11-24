import DShapeC from "../assets/images/3DShape3.jpg";
import { useState, useEffect } from "react";
import { Button,Link } from "@nextui-org/react";


export default function OurService() {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const initialMargin =
        scrollPosition < 100 ? 0 : (2000 - scrollPosition) * 0.2;

    return (
        <div
            className="relative w-full h-[50vh] flex px-16 py-16 "
            style={{
                backgroundImage: `url(${DShapeC})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginTop: "-9vh",
                overflowY: "auto",
                backdropFilter: "blur(100px)",
            }}
        >
              <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "50vh",
                                backdropFilter: "blur(4px)",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                zIndex: 1,
                            }}
                        ></div>
            <h1
                className="neon-text2"
                style={{
                    fontFamily: "Lemon Milk",
                    fontSize: "9rem",
                    zIndex: 900,
                    marginTop: "-10vh",
                    marginLeft: `${initialMargin}%`,
                    transition: "margin 0.5s ease",
                    color: "black",
                    lineHeight: "0.8",
                }}
            >
                What we do
            </h1>

            <div className="absolute top-[15vh] left-0 right-0 bottom-0 z-10 flex flex-col items-center gap-20 px-12   overflow-hidden">
               
                    <div className="flex flex-col justify-center items-center text-center">
                  
                        <div className="flex flex-col justify-center items-center text-center p-4 gap-5 overflow-hidden">
                        
                            <p
                                style={{
                                    fontFamily: "Lemon Milk",
                                    fontSize: "2rem",
                                   fontWeight: 600,
                                   
                                    
                                }}
                            >
                                "Crafting Tailored Websites for Every Need. <br />
                                 Select from Diverse Templates and Designs. <br />
                                 Empowered with an Intuitive Content Management System." <br />
                            
                                 
                            </p>
                            
                               
                           
                        </div>
                    </div>
               </div>
        </div>
    );
}
