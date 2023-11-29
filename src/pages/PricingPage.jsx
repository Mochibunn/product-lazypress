import { Button } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useState } from "react";

const pricingOptions = [
  {
    subscriptionType: "monthly",
    price: 9,
    benefitOptions: [
      "Access to Builder",
      "Export Code",
      "Access to Pro Components",
      "Access to New Components",
      "Unlimited Pages",
      "Unlimited Projects",
      "Unlimited Exports",
      "1 Team Size",
    ],
  },
  {
    subscriptionType: "yearly",
    price: 69,
    benefitOptions: [
      "Access to Builder",
      "Export Code",
      "Access to Pro Components",
      "Access to New Components",
      "Unlimited Pages",
      "Unlimited Projects",
      "Unlimited Exports",
      "1 Team Size",
    ],
  },
  {
    subscriptionType: "lifetime",
    price: 99,
    benefitOptions: [
      "Access to Builder",
      "Export Code",
      "Access to Pro Components",
      "Access to New Components",
      "Unlimited Pages",
      "Unlimited Projects",
      "Unlimited Exports",
      "1 Team Size",
    ],
  },
];

export default function PricingPage() {
  const makePayment = async (price) => {
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );

      const response = await fetch(
        "http://localhost:24601/api/create-checkout-session",
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

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) throw new Error(result.error);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="h-[100vh]">
        <div className="flex gap-4 justify-center p-8 pt-20">
          {pricingOptions.map((option) => (
            <div className="border-2 border-black p-3">
              <h4 className="uppercase">{option.subscriptionType}</h4>
              <h4>
                {option.price}/{option.subscriptionType}
              </h4>
              <Button onClick={() => makePayment(option.price)}>Buy Now</Button>
              <ul>
                {option.benefitOptions.map((benefit) => (
                  <li className="flex items-center">
                    <IoIosCheckmarkCircle />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="border-2 border-black p-3">
            <h4>Contact Us</h4>
            <p>
              Bulk discounts, custom contracts <br /> and enterprise support
            </p>
            <Button>Talk with Us</Button>
          </div>
        </div>
      </div>
    </>
  );
}
