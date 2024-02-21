import { Button } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { IoIosCheckmarkCircle } from "react-icons/io";
import DShapeB from "../assets/images/3DShape1.jpg";
import { useNavigate } from "react-router-dom";

const pricingOptions = [
    {
        subscriptionType: "basic",
        price: 9,
        benefitOptions: [
            "Access to Builder",
            "Export Code",
            "Access to Pro Components",
            "Access to New Components",
            "Unlimited Pages",
            "Unlimited Projects",
            "Unlimited Exports",
            "1 account access",
            "Control Management System",
        ],
    },
    {
        subscriptionType: "plus",
        price: 69,
        benefitOptions: [
            "Access to Builder",
            "Export Code",
            "Access to Pro Components",
            "Access to New Components",
            "Unlimited Pages",
            "Unlimited Projects",
            "Unlimited Exports",
            "1 account access",
            "Control Management System",
        ],
    },
    {
        subscriptionType: "premıum",
        price: 99,
        benefitOptions: [
            "Access to Builder",
            "Export Code",
            "Access to Pro Components",
            "Access to New Components",
            "Unlimited Pages",
            "Unlimited Projects",
            "Unlimited Exports",
            "Multıple teams",
            "Control Management System",
        ],
    },
];
let backend;
backend = import.meta.env.DEV
    ? import.meta.env.VITE_BACKEND_DEV
    : import.meta.env.VITE_BACKEND_DEPLOY;

export default function PricingPage() {
    const navigate = useNavigate();
    const makePayment = async (price) => {
        try {
            const stripe = await loadStripe(
                import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
            );

            const response = await fetch(
                `${backend}/stripe/api/create-checkout-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ price }),
                }
            );

            console.log("Request Body:", JSON.stringify({ price }));

            if (!response.ok)
                throw new Error(
                    `Failed to fetch data: ${response.status} ${response.statusText}`
                );

            const session = await response.json();
            console.log(session);

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) throw new Error(result.error);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
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
                <div className="flex gap-4 justify-center pt-28">
                    {pricingOptions.map((option) => (
                        <div
                            key={crypto.randomUUID()}
                            className="border-2 border-black p-28 glassCardSmall"
                        >
                            <h4 className="uppercase">
                                {option.subscriptionType}
                            </h4>
                            <h4>&#8364;{option.price}/monthly</h4>
                            <Button
                                onPress={() => makePayment(option.price)}
                                className="jellyButtonNavBar my-1"
                            >
                                Buy Now
                            </Button>
                            <ul className="pt-1">
                                {option.benefitOptions.map((benefit) => (
                                    <li
                                        key={crypto.randomUUID()}
                                        className="flex items-center"
                                    >
                                        <IoIosCheckmarkCircle />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="border-2 border-black p-3 glassCardSmall">
                        <h4>Enterprise</h4>
                        <p>
                            Bulk discounts, custom
                            <br />
                            contracts and enterprise
                            <br />
                            support Premium support,
                            <br /> 24/7/365
                        </p>
                        <Button
                            onPress={() => navigate("/contactus")}
                            className="jellyButtonNavBar my-1"
                        >
                            Contact Us
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
