//import axios from "axios";
import { useNavigate, redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ThankyouPage from "../pages/ThankyouPage";
import DShapeB from "../assets/images/3DShape1.jpg";

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
        navigate("/", { replace: true });
      }, 10000);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
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
      {!submitted && (
        <div
          style={{
            backgroundImage:`url(${DShapeB})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height:'100vh',
            marginTop:'-4rem',
            zIndex:40,
            position:'relative',
          }}
        >
          <h2 className="text-blackfont-bold text-center text-4xl mt-20">
            We're here for you
          </h2>
          <h3 className="text-black text-center text-xl">
            Fill out the form to start the conversation <br/> right away we will get back
            to you
          </h3>
          <div className="flex justify-evenly text-black-2">
           {/* <div>
              <p className="text-black text-lg">
                No matter what do you need - to find out more <br /> about our
                experience, to ask us how to improve <br />
                or build your templates or to request a quote -<br /> do not to
                get in touch with us. We will be happy <br /> to talk with you
                to share our experience and <br />
                to give you ideas about the right design
                <br /> direction for your web application.{" "}
              </p>
        </div> */}
            <div className="rounded w-[40vw] glassCardSmall top-50 left-50 "
            style={{marginTop:'4vh'}}>
              {/* ------------------------form validation------------------------ */}
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="flex flex-col gap-3 glassSmallCard"
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
                      // min: 3,
                      // max: 20,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                    className="w-[37vw] h-8 glassInput transition-all font-medium"
                  />
                  {errors?.firstName?.type === "pattern" && (
                    <p style={{ color: "red" }}>
                      &#9888; Alphabetical characters only
                    </p>
                  )}
                  {errors?.firstName?.type === "required" && (
                    <p style={{ color: "red" }}>
                      &#9888; This field is required
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
                    className="w-[37vw] h-8 glassInput transition-all font-medium"
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
                      &#9888; Last name must have minimum 3 characters
                    </p>
                  )}
                  {errors?.lastName?.type === "maxLength" && (
                    <p style={{ color: "red" }}>
                      &#9888; Last name can not exceed more than 20 characters
                    </p>
                  )}
                </label>

                <label
                  htmlFor="email"
                  className="flex flex-col text-[#4b1544] font-bold"
                >
                  Email:
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
                    className="w-[37vw] h-8 glassInput transition-all font-medium"
                  />
                  {/* <p style={{ color: "red" }}> {errors.email?.message}</p> */}
                  {errors?.email?.type === "pattern" && (
                    <p style={{ color: "red" }}>
                      {" "}
                      &#9888; This is not the valid email
                    </p>
                  )}
                  {errors?.email?.type === "required" && (
                    <p style={{ color: "red" }}>
                      {" "}
                      &#9888; This field is required
                    </p>
                  )}
                </label>
                <label
                  htmlFor="textarea"
                  className="flex flex-col text-[#4b1544] font-bold"
                >
                  Message
                  <textarea
                    id="textarea"
                    className="w-[37vw] h-20 glassTextArea transition-all font-medium"
                    {...register("textarea", {
                      required: "This is a required field",
                      minLength: 30,
                      maxLength: 200,
                    })}
                  ></textarea>
                  {/* <p style={{ color: "red" }}> {errors.textarea?.message}</p> */}
                  {errors?.textarea?.type === "required" && (
                    <p style={{ color: "red" }}>
                      {" "}
                      &#9888; This field is required
                    </p>
                  )}
                  {errors?.textarea?.type === "minLength" && (
                    <p style={{ color: "red" }}>
                      &#9888; Message must have minimum 30 characters
                    </p>
                  )}
                  {errors?.textarea?.type === "maxLength" && (
                    <p style={{ color: "red" }}>
                      &#9888; Message can not exceed more than 200 characters
                    </p>
                  )}
                </label>
                {/* <input
      <div
                        className="w-full h-[100vh] overflow-hidden "
                        style={{
                            backgroundImage: `url(${DShapeB})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            transition: "transform 0.3s ease",
                            position: "relative",
                            top: '-9vh'
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100vh",
                                backdropFilter: "blur(4px)",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                zIndex: 1,
                            }}
                        ></div>
        <h2 className="text-[#f39d50] font-bold text-center p-3 text-4xl absolute" style={{zIndex:50}}>
          We're all here
        </h2>
        <h3 className="text-white text-center text-xl absolute z-50">
          Fill out the form to start the conversation - we will get right back
          to you
        </h3>
        <div className="flex justify-evenly text-black-2 py-16 z-50 absolute">
          <div>
     
            <p className="text-white text-sm z-50">
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
          <div className="bg-[#f39d50] p-[40px] rounded w-96 glassCardSmall">
            {/* ------------------------form validation------------------------ */}

                <button type="submit" className="jellyButtonNavBar">
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {submitted && <ThankyouPage />}
    </>
  );
}
