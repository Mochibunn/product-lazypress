import { SignUp } from "@clerk/clerk-react";
import DShapeA from "../assets/images/3DShape1.jpg";

export default function SignUpPage() {
    return (
        <div
            className="flex justify-center items-center  grow"
            style={{
                backgroundImage: `url(${DShapeA})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: '100vh'
            }}
        >
           
            <SignUp
                signInUrl="/sign-in"
                appearance={{
                    elements: {
                        card: "glassCardSmall",
                        formFieldInput: "glassInput",
                        formButtonPrimary: "jellyButtonNavBar",
                       
                    },
                   
                }}
            />
        </div>
    );
}
