import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function NotFound() {
    const location = useLocation();
    const status = location.state;
    const statInit = () => {
        if (!+status) return "404";
        return `${status}`;
    };
    const [stat] = useState(statInit);
    console.log("Stat is: ", stat);
    const navigate = useNavigate();

    return (
        <main className="flex flex-col items-center h-screen px-6">
            <h1 className="text-7xl font-black mb-5">{stat}</h1>
            {stat === "500" && (
                <p className="text-xl text-center font-semibold mb-5">
                    Internal server error
                </p>
            )}
            <p className="text-xl text-center mt-5">
                This path is blocked by a sleeping Snorlax
            </p>
            <Button
                onPress={() => navigate(-1)}
                color="secondary"
                className="mt-10"
            >
                Go back
            </Button>
        </main>
    );
}
