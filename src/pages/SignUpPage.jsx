import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
    return (
        <div className="flex justify-center items-center bg-tiffany-blue p-4 grow">
            <SignUp
                signInUrl="/sign-in"
                appearance={{
                    elements: {
                        card: "bg-celadon",
                        formFieldInput: "bg-tiffany-blue",
                        formButtonPrimary: "bg-pink-lavender",
                    },
                }}
            />
        </div>
    );
}
