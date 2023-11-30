import { useNavigate } from "react-router";
import DShapeB from "../assets/images/3DShape1.jpg";
export default function Cancel() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/pricing", { replace: true });
  };
  const navigateToHome = () => {
    navigate("/", { replace: true });
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
        <p className="text-4xl mt-20">Payment Failed</p>
        <p>Purchase not confirmed. Please try again</p>
        <button
          className="jellyButtonNavBar px-4 mt-2 mx-2"
          onClick={handleNavigate}
        >
          Retry
        </button>
        <button
          className="jellyButtonNavBar px-3 mt-2 mx-2"
          onClick={navigateToHome}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
