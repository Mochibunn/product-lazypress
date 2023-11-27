import { Button,Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animations/sleepingCat.json";
import moon from "../assets/animations/Moon.json";
import sun from "../assets/animations/Sun.json";
import { Animator,MoveOut, ScrollContainer, ScrollPage,batch, FadeIn,MoveIn} from "react-scroll-motion";
import DShapeA from "../assets/images/3DShape1.jpg";
import { motion } from "framer-motion";

export default function HeroBanner() {
    const [moonRotation, setMoonRotation] = useState(0);
    const [moonTranslation, setMoonTranslation] = useState(0);
    const [sunOpacity, setSunOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const rotation = scrollPosition * 0.3;
            const translation = scrollPosition * 0.15;

            const moonTouchOffset = 150;
            const opacity = Math.max(
                0,
                Math.min(
                    1,
                    1 - (scrollPosition - moonTouchOffset) / window.innerHeight
                )
            );

            setSunOpacity(opacity);
            setMoonRotation(rotation);
            setMoonTranslation(translation);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <ScrollContainer>
                <ScrollPage
                    style={{
                        height: "300vh",
                        overflow: "hidden",
                        marginTop: "-9vh",
                    }}
                >
                    <div
                        className="w-full h-[150vh] overflow-hidden "
                        style={{
                            backgroundImage: `url(${DShapeA})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            transition: "transform 0.3s ease",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "150vh",
                                backdropFilter: "blur(4px)",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                zIndex: 1,
                            }}
                        ></div>
                       <Lottie
                            animationData={moon}
                            className="z-40 absolute"
                            style={{
                                width: "650px",
                                marginLeft: "50vw",
                                marginTop: `calc(-5vh + ${moonTranslation}vh)`,
                                transform: `rotate(${moonRotation}deg)`,
                            }}
                        /> 
                        <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-50 flex justify-between items-center gap-10"
                            style={{ marginTop: "-20vh" }}
                        >
                            <Animator animation={batch(MoveOut(-1500, -1500))}>
                                <motion.div
                                    initial={{ opacity: 0, y: 0 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 3 }}
                                    className="neon-text-container flex flex-col justify-between gap-3"
                                >
                                    <h1
                                        className="text-6xl font-extrabold tracking-wide neon-text"
                                        style={{
                                            textAlign: "initial",
                                            fontFamily: "Lemon Milk",
                                            fontSize: "6rem",
                                        }}
                                    >
                                        You Sleep <br /> We Code
                                    </h1>
                                    <Lottie
                                        animationData={animationData}
                                        style={{
                                            width: "200px",
                                            zIndex: "1000",
                                        }}
                                    />
                                    <Button
                                        className="jellyButton"
                                        style={{ marginTop: "-6vh" }}
                                        as={Link}
                                        href="sign-up"
                                    >
                                        Get Started
                                    </Button>
                                    {/*<Lottie animationData={ScrollDown} style={{ width: '150px', zIndex: '1000',fontWeight:'600' }} />*/}
                                </motion.div>
                            </Animator>
                        </div>
                    </div>
                    <div
                        className="w-screen h-[150vh] overflow-hidden"
                        style={{
                            backgroundImage: `url(${DShapeA})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            marginTop: "0",
                            transition: "transform 0.3s ease",
                            transform: "scaleY(-1)",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "150vh",
                                zIndex: 1,
                                opacity: sunOpacity,
                                backgroundColor: "black",
                            }}
                        ></div>

                        <Lottie
                            animationData={sun}
                            style={{
                                zIndex: 1,
                                transform: "scaleY(-1)",
                                width: "800px",
                                marginLeft: "45vw",
                                marginTop: `calc(185vh - ${moonTranslation}vh)`,
                            }}
                        />

                        <div className="text-center">
                            <h1
                                className="text-6xl font-extrabold tracking-wide text-black "
                                style={{
                                    fontFamily: "Pilated",
                                    fontSize: "9rem",
                                    zIndex: "1500",
                                    position: "absolute",
                                    transform: "scaleY(-1)",
                                    top: "40vh",
                                    color: "black",
                                }}
                            >
                                Building Your Online World <br />
                                with Built-In Easy Maintenance
                            </h1>
                        </div>
                    </div>
                </ScrollPage>
            </ScrollContainer>
        </>
    );
}
