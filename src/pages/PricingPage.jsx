import { Button } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router";
export default function PricingPage() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    window.open("https://buy.stripe.com/test_4gwaIh5Ed6TP7VC8ww", "_blank");
    navigate("/");
  };
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OH34hKf4NKtRgVi6VnYMQfcWdkijbLYhl8Zuh5CdDRmXcfQtb8iZJCDgXWqFLznK1RmF4cHp5eqbN5QvRuvqjsJ00Eu8zQ9qa"
    );

    const products = [
      { firstName: "john", lastName: "Deo", amount: 80 },
      { firstName: "john", lastName: "Das", amount: 100 },
    ];
    // const products = [
    //   {
    //     id: 1,
    //     dish: "punjabi",
    //     imgdata:
    //       "https://b.zmtcdn.com/data/pictures/9/18857339/8f53919f1175c08cf0f0371b73704f9b_o2_featured_v2.jpg?output-format=webp",
    //     address: "North Indian, Biryani, Mughlai",
    //     delimg:
    //       "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    //     somedata: " 1175 + order placed from here recently",
    //     price: 350,
    //     rating: "3.8",
    //     arrimg:
    //       "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    //     qnty: 0,
    //   },
    //   {
    //     id: 2,
    //     dish: "Jugaadi Adda vadapav",
    //     imgdata:
    //       "https://b.zmtcdn.com/data/pictures/chains/5/19295245/089cbcf1d3307542c72f77272556b28b_o2_featured_v2.jpg?output-format=webp",
    //     address: "Street Food",
    //     delimg:
    //       "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    //     somedata: " 2525 + order placed from here recently",
    //     price: 25,
    //     rating: "3.9",
    //     arrimg:
    //       "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    //     qnty: 0,
    //   },
    //   {
    //     id: 3,
    //     dish: "La Milano Pizza",
    //     imgdata:
    //       "https://b.zmtcdn.com/data/pictures/chains/1/19708611/10f90d4a69678d98662514d173b29665_o2_featured_v2.jpg",
    //     address: "Pizza, Fast Food, Pasta",
    //     delimg:
    //       "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    //     somedata: " 650 + order placed from here recently",
    //     price: 70,
    //     rating: "4.2",
    //     arrimg:
    //       "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    //     qnty: 0,
    //   },
    //   {
    //     id: 4,
    //     dish: "Momoman Momos",
    //     imgdata:
    //       "https://b.zmtcdn.com/data/pictures/chains/1/113401/59f29399060caefcc575d59dc9402ce8_o2_featured_v2.jpg",
    //     address: "Momos",
    //     delimg:
    //       "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    //     somedata: " 300 + order placed from here recently",
    //     price: 70,
    //     rating: "3.8",
    //     arrimg:
    //       "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    //     qnty: 0,
    //   },
    //   {
    //     id: 5,
    //     dish: "Jassi De Parathe",
    //     imgdata:
    //       "https://b.zmtcdn.com/data/pictures/chains/5/110225/3978e28854b7496dbef9496546734811_o2_featured_v2.jpg",
    //     address: "North Indian",
    //     delimg:
    //       "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    //     somedata: "1050 + order placed from here recently",
    //     price: 210,
    //     rating: "4.0",
    //     arrimg:
    //       "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    //     qnty: 0,
    //   },
    //   {
    //     id: 6,
    //     dish: "Spring Rolls",
    //     imgdata:
    //       "https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg",
    //     address: "Wraps FastFood, Chines",
    //     delimg:
    //       "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    //     somedata: " 1100 + order placed from here recently",
    //     price: 100,
    //     rating: "3.8",
    //     arrimg:
    //       "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    //     qnty: 0,
    //   },
    //   {
    //     id: 7,
    //     dish: "Hocco Eatery",
    //     imgdata:
    //       "https://b.zmtcdn.com/data/pictures/chains/5/110155/811c01a5430d50d3260f77917da99e12_o2_featured_v2.jpg",
    //     address: "North Indian, Fast Food",
    //     delimg:
    //       "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    //     somedata: "500 + order placed from here recently",
    //     price: 300,
    //     rating: "3.8",
    //     arrimg:
    //       "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    //     qnty: 0,
    //   },
    //   {
    //     id: 8,
    //     dish: "Chai Wai",
    //     imgdata:
    //       "https://b.zmtcdn.com/data/pictures/3/18514413/0a17b72e9fec52a3ca736f4c2ea3646f_o2_featured_v2.jpg",
    //     address: "Tea, Coffee, Shake, Beverages",
    //     delimg:
    //       "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    //     somedata: "500 + order placed from here recently",
    //     price: 100,
    //     rating: "3.2",
    //     arrimg:
    //       "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    //     qnty: 0,
    //   },
    //   {
    //     id: 9,
    //     dish: "HL Frankie",
    //     imgdata:
    //       "https://b.zmtcdn.com/data/pictures/7/19639627/94c0a4cf15c02d3982d154e2c5dd8cbb_o2_featured_v2.jpg",
    //     address: "Burger, Sandwich, Fast Food",
    //     delimg:
    //       "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
    //     somedata: "2525 + order placed from here recently",
    //     price: 100,
    //     rating: "3.8",
    //     arrimg:
    //       "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
    //     qnty: 0,
    //   },
    // ];
    const body = {
      // // products: {
      // products: [
      //   { firstName: "john", lastName: "Deo" },
      //   { firstName: "john", lastName: "Das" },
      // ],
      // // },
      products: products,
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

    //     const rawResponse = await response.text();
    //     console.log("Raw Response:", rawResponse);
    //
    //     const session = await response.json();
    //     console.log("Parsed Response:", session);

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
            <h4>$0</h4>
            <Button onClick={handleSubmit}>Buy Now</Button>
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
            <h4>$9/month</h4>
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
            <Button>Buy Now</Button>
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
