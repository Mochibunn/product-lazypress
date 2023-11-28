export default function OurService() {
    return (
        <div className="relative w-full flex" style={{ height: "30vh" }}>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "90vh",
                    backdropFilter: "blur(4px)",
                    backgroundColor: "#333131",
                    zIndex: 1,
                }}
            ></div>
            <div className="wrapper z-50">
                <div className="marquee">
                    <h1
                        style={{
                            fontFamily: "Pilated",
                            fontWeight: "bold",
                            fontSize: "18rem",
                            zIndex: 900,
                            marginTop: "0",
                            marginLeft: 0,
                            transition: "margin 0.5s ease",
                            lineHeight: "0.8",
                        }}
                    >
                        <div className="text text-1">Wh</div>
                        <div className="text text-2">at &nbsp;</div>
                        <div className="text text-3">We &nbsp;</div>
                        <div className="text text-4">Do</div>
                        <div className="text text-2">* &nbsp;</div>
                        <div className="text text-1">Wh</div>
                        <div className="text text-2">at &nbsp;</div>
                        <div className="text text-3">We &nbsp;</div>
                        <div className="text text-4">Do</div>
                        <div className="text text-2">*</div>
                        <div className="text text-1">Wh</div>
                        <div className="text text-2">at &nbsp;</div>
                        <div className="text text-3">We &nbsp;</div>
                        <div className="text text-4">Do</div>
                        <div className="text text-2">*</div>
                    </h1>
                </div>
            </div>
        </div>
    );
}
