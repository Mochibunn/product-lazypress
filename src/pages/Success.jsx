import DShapeB from "../assets/images/3DShape1.jpg";
import { useNavigate } from "react-router-dom";

export default function Success() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        setTimeout(() => {
            navigate("/contactus", { replace: true });
        }, 1000);
    };
    return (
        <div
            style={{
                backgroundImage: `url(${DShapeB})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                marginTop: "-4rem",
                zIndex: 40,
                position: "relative",
            }}
        >
            <div className="text-black font-bold text-center text-xl mt-32">
                <p className="text-4xl mt-20">Order Confirmation</p>
                <p>
                    Thank you for purchase with LazyPress, We’ve confirmed your
                    payment.
                </p>
                <p>If you have any questions, feel free to reach out</p>
                <button
                    className="jellyButtonNavBar px-2 mt-2"
                    onClick={handleNavigate}
                >
                    Contact Us
                </button>
            </div>
        </div>
    );
}
