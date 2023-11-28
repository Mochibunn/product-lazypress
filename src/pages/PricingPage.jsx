import { Button } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useState } from "react";
export default function PricingPage() {
  const [value, setValue] = useState({ id: 1, price: 100 });

  const makePayment = async () => {
    console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );
    const body = {
      price: value,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:24601/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    console.log("Request Body:", JSON.stringify(body));
    if (!response.ok) {
      console.error(
        "Failed to fetch data:",
        response.status,
        response.statusText
      );
      return;
    }

    const session = await response.json();
    console.log(session);
    const result = stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.log(result.error);
    }
  };
  return (
    <>
      <div className="h-[100vh]">
        <div className="flex gap-4 justify-center p-8 pt-20">
          <div className="border-2 border-black p-3">
            <h4>FREE</h4>
            <h4>$10</h4>
            <Button onClick={makePayment}>Buy Now</Button>
            <p>No credit card required</p>
            <li className="flex items-center">
              <IoIosCheckmarkCircle /> Verification emails
            </li>
            <li className="flex items-center">
              <IoIosCheckmarkCircle /> Custom domains
            </li>
            <li className="flex items-center">
              <IoIosCheckmarkCircle /> Pre-built components
            </li>
          </div>
          <div className="border-2 border-black p-3">
            <h4>MONTHLY</h4>
            <h4>{value.price}</h4>
            <Button onClick={makePayment}>Buy Now</Button>
            <ul>
              <li className="flex items-center">
                <IoIosCheckmarkCircle /> Access to Builder
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle /> Export Code
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle />
                Access to Pro Components
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle />
                Access to New Components
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle /> Unlimited Pages
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle /> Unlimited Projects
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle /> Unlimited Exports
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle /> 1 Team Size
              </li>
            </ul>
          </div>
          <div className="border-2 border-black p-3">
            <h4>YEARLY</h4>
            <h4>$69/year</h4>
            <Button onClick={makePayment}>Buy Now</Button>
            <ul>
              <li className="flex items-center">
                <IoIosCheckmarkCircle /> Access to Builder
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle /> Export Code
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle />
                Access to Pro Components
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle />
                Access to New Components
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle /> Unlimited Pages
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle /> Unlimited Projects
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle /> Unlimited Exports
              </li>
              <li className="flex items-center">
                <IoIosCheckmarkCircle /> 1 Team Size
              </li>
            </ul>
          </div>
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
