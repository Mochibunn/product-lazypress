import axios from "axios";
import { Image } from "@nextui-org/react";
import { useNavigate, redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ThankyouMessage from "../test/ThankyouMessage";

export default function CPform() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = async (data, event) => {
    try {
      event.preventDefault();
      console.log(data);
      // await axios.post("http://localhost:5173/contactus", data);
      // // window.location.replace("/");

      setSubmitted(true);
      setTimeout(() => {
        // setSubmitted(false);
        // navigate("/", { replace: true });
      }, 10000);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  //
  //   const handleChange = () => {
  //     navigate("/");
  //   };
  const onError = () => {
    console.log("wrong");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();

  console.log(errors);
  //
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(47,22,62,1) 18%, rgba(76,21,68,1) 75%, rgba(186,16,91,1) 99%, rgba(179,16,90,1) 100%)",
        }}
      >
        <h2 className="text-[#f39d50] font-bold text-center p-3 text-4xl">
          We're all here
        </h2>
        <h3 className="text-white text-center text-xl">
          Fill out the form to start the conversation - we will get right back
          to you
        </h3>
        <div className="flex justify-evenly text-black-2 py-16">
          <div>
            <Image
              isZoomed
              width={240}
              alt="NextUI Fruit Image with Zoom"
              src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
            />
            <p className="text-white text-sm">
              No matter what do you need - to find out more about our
              <br />
              experience, to ask us how to improve or build your templates or to
              <br />
              request a quote - do not hesitate to get in touch with us. We will
              <br />
              be happy to talk with you to share our experience and to give you
              <br />
              ideas about the right design direction for your web application.{" "}
            </p>
          </div>
          <div className="bg-[#f39d50] p-[40px] rounded w-96">
            {/* ------------------------form validation------------------------ */}
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="flex flex-col gap-3"
            >
              <label
                htmlFor="firstName"
                className="flex flex-col text-[#4b1544] font-bold"
              >
                First Name:
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    required: "This is a required field",
                    minLength: 3,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  className="w-80 h-8 outline-none border-2 border-[#4b1544] rounded-lg transition-all font-medium"
                />
                {errors?.firstName?.type === "pattern" && (
                  <p style={{ color: "red" }}>
                    &#9888; Alphabetical characters only
                  </p>
                )}
                {errors?.firstName?.type === "required" && (
                  <p style={{ color: "red" }}>
                    &#9888; This field is required Alphabetical characters only
                  </p>
                )}
                {errors?.firstName?.type === "minLength" && (
                  <p style={{ color: "red" }}>
                    &#9888; First name must have minimum 3 characters
                  </p>
                )}
                {errors?.firstName?.type === "maxLength" && (
                  <p style={{ color: "red" }}>
                    &#9888; First name cannot exceed 20 characters
                  </p>
                )}
              </label>
              <label
                htmlFor="lastName"
                className="flex flex-col text-[#4b1544] font-bold"
              >
                Last Name:
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: "This is a required field",
                    minLength: 3,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  className="w-80 h-8 outline-none border-2 border-[#4b1544] rounded-lg transition-all font-medium"
                />
                {errors?.lastName?.type === "pattern" && (
                  <p style={{ color: "red" }}>
                    {" "}
                    &#9888; Alphabetical characters only
                  </p>
                )}
                {errors?.lastName?.type === "required" && (
                  <p style={{ color: "red" }}>
                    {" "}
                    &#9888; This field is required
                  </p>
                )}
                {errors?.lastName?.type === "minLength" && (
                  <p style={{ color: "red" }}>
                    &#9888; First name must have minimum 3 characters
                  </p>
                )}
                {errors?.lastName?.type === "maxLength" && (
                  <p style={{ color: "red" }}>
                    &#9888; First name must have minimum 3 characters
                  </p>
                )}
              </label>

              <label
                htmlFor="email"
                className="flex flex-col text-[#4b1544] font-bold"
              >
                email
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "This is a required field",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    },
                  })}
                  className="w-80 h-8 outline-none border-2 border-[#4b1544] rounded-lg transition-all font-medium"
                />
                <p style={{ color: "red" }}> {errors.email?.message}</p>
              </label>
              <label
                htmlFor="textarea"
                className="flex flex-col text-[#4b1544] font-bold"
              >
                Message
                <textarea
                  id="textarea"
                  className="w-80 h-20 outline-none border-2 border-[#4b1544] rounded-lg transition-all font-medium"
                  {...register("textarea", {
                    required: "This is a required field",
                    minLength: 30,
                    maxLength: 200,
                  })}
                ></textarea>
                <p style={{ color: "red" }}> {errors.textarea?.message}</p>
              </label>
              {/* <input
                type="submit"
                className="bg-[#4b1544] text-white px-2 py-1 rounded"
                
              /> */}
              <button
                type="submit"
                className="bg-[#4b1544] text-white px-2 py-1 rounded"
                // onClick={handleChange}
              >
                submit
              </button>
            </form>
          </div>
          {submitted && <ThankyouMessage />}
        </div>
      </div>
    </>
  );
}
