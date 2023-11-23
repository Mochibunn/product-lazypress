import DShapeC from "../assets/images/3DShape3.jpg";
import { useState, useEffect } from "react";
import { Button, Link } from "@nextui-org/react";

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
            className="relative w-full h-[100vh] flex px-16 py-16 "
            style={{
                backgroundImage: `url(${DShapeC})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginTop: "-9vh",
                overflowY: "auto",
                backdropFilter: "blur(100px)",
            }}
        >
            <h1
                className="neon-text2"
                style={{
                    fontFamily: "Lemon Milk",
                    fontSize: "18rem",
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

            <ul className="absolute top-[30vh] left-0 right-0 bottom-0 z-10 flex flex-col items-center gap-20 px-12 serviceUL  overflow-x-hidden">
                <li className="glassCardSmall">
                    <div className="flex flex-col justify-center items-start text-center">
                        <div className="flex flex-col justify-center items-center text-center p-4 gap-5">
                            <p
                                style={{
                                    fontFamily: "Lemon Milk",
                                    fontSize: "1rem",
                                }}
                            >
                                "We build custom websites for any purpose.{" "}
                                <br />
                                Choose from our range of templates & designs.{" "}
                                <br />
                                Our sites come with an easy-to-use Content{" "}
                                <br />
                                Management System."
                            </p>
                            <Link
                                color="foreground"
                                href="#"
                                className="text-black"
                            >
                                <Button className="jellyButtonNavBar">
                                    Go to Pricing
                                </Button>
                            </Link>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
