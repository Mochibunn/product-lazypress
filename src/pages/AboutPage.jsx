import DShapeB from "../assets/images/3DShape1.jpg";

export default function AboutPage() {
    return (
        <div
            className="h-[100vh]"
            style={{
                backgroundImage: `url(${DShapeB})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                marginTop: "-4rem",
                // zIndex: 40,
                position: "relative",
            }}
        >
            <div className="flex justify-center mt-32">
                <img className="border-2 border-black h-[300px] w-[400px]" />
            </div>
        </div>
    );
}
