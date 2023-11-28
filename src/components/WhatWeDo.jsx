import { useState, useEffect } from "react";

export default function WhatWeDo() {
    const [zoom, setZoom] = useState(0.25);
    const [scrollPosition, setScrollPosition] = useState(0);
    const ZOOM_SPEED = 0.1;

    useEffect(() => {
        const handleWheel = (e) => {
            if (e.deltaY > 0 && zoom < 4) {
                setZoom((prevZoom) => Math.min(prevZoom + ZOOM_SPEED, 1));
            } else if (e.deltaY < 0 && zoom > 0.25) {
                setZoom((prevZoom) => Math.max(prevZoom - ZOOM_SPEED, 0.1));
            }
        };

        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        document.addEventListener("wheel", handleWheel);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("wheel", handleWheel);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [zoom]);

    return (
        <div
            className="relative w-full flex items-center justify-center"
            style={{
                backgroundColor: "#333131",
                overflow: "hidden",
                zIndex: 40,
                height: "50vh",
                marginBottom: "10vh",
            }}
        >
            <div
                className="absolute"
                style={{
                    transform: `scale(${zoom})`,
                    transition: "transform 0.3s ease",
                    backgroundColor: "#333131",
                    borderRadius: "20px",
                    fontSize: "3.5rem",
                    padding: "20px",
                    zIndex: 50,
                    opacity: 1,
                    color: "#fffff1",
                }}
            >
                <p
                    className="m-10"
                    style={{ fontFamily: "Noyh", textAlign: "left" }}
                >
                    <span style={{ fontFamily: "Pilated" }}> * </span> we
                    specialize in crafting{" "}
                    <span
                        className="italic font-bold"
                        style={{
                            fontFamily: "Pilated",
                           
                            backgroundColor: "#E5D0E3",
                            borderRadius: '40px',
                            padding: "0.8rem",
                            fontSize: "2rem",
                            color: "#333131",
                        }}
                    >
                        tailored websites
                    </span>{" "}
                    for various purposes.
                    <br />
                    With our{" "}
                    <span
                        className="italic font-extrabold"
                        style={{
                            fontFamily: "Pilated",
                            
                            backgroundColor: "#968aea",
                            borderRadius: '40px',
                            padding: "0.8rem",
                            fontSize: "2rem",
                            color: "#333131",
                        }}
                    >
                        user-friendly
                    </span>{" "}
                    Content Management System,
                    <br />
                    you have the tools to manage your site{" "}
                    <span
                        className="italic font-bold"
                        style={{
                            fontFamily: "Pilated",
                            backgroundColor: "orange",
                            
                            borderRadius: '40px',
                            padding: "0.8rem",
                            fontSize: "2rem",
                            color: "#333131",
                        }}
                    >
                        effortlessly
                    </span>
                    , ensuring <br /> a{" "}
                    <span
                        className="italic font-bold"
                        style={{
                            fontFamily: "Pilated",
                            backgroundColor: "#7BE0AD",
                            borderRadius: '40px',
                            padding: "0.8rem",
                            fontSize: "2rem",
                            color: "#333131",
                        }}
                    >
                        dynamic
                    </span>{" "}
                    and{" "}
                    <span
                        className="italic  font-bold"
                        style={{
                            fontFamily: "Pilated",
                            backgroundColor: "#AEE5D8",
                            borderRadius: "40px",
                            padding: "0.8rem",
                            fontSize: "2rem",
                            color: "#333131",
                        }}
                    >
                        personalized
                    </span>{" "}
                    online presence. <br />
                </p>
            </div>
        </div>
    );
}
