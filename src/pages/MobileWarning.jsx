import { Button } from "@nextui-org/react";
import DShapeB from "../assets/images/3DShape1.jpg";
import { useNavigate, useParams } from "react-router-dom";

export default function MobileWarning() {
    const { blogId } = useParams();
    const navigate = useNavigate();
    return (
        <div
            className="flex justify-center items-center"
            style={{
                backgroundImage: `url(${DShapeB})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100vh",
                // marginTop: "-4rem",
                // zIndex: 40,
                // position: "relative",
            }}
        >
            <div
                className="rounded glassCardSmall flex flex-col justify-center gap-6 min-h-[40vh]"
                // style={{ marginTop: "4vh" }}
            >
                <h3 className="text-center">
                    We recommend switching to your desktop for a better
                    experience of the Lazypress CMS.
                </h3>
                <Button onPress={() => navigate(`/cms/${blogId}`)}>
                    Continue on mobile
                </Button>
            </div>
        </div>
    );
}
