import { Image, Input, Textarea, Button } from "@nextui-org/react";
import { useState, useMemo } from "react";

export default function CPform() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
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
          <div className="bg-[#f39d50] p-[50px]">
            <form onSubmit={handleSubmission}>
              <label>
                First Name:
                <Input
                  required
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-80 outline-none border-2 border-[#4b1544] rounded-2xl transition-all"
                />
              </label>
              <label>
                Last Name:
                <Input
                  required
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-80 outline-none border-2 border-[#4b1544] rounded-2xl transition-all"
                />
              </label>
              <label>
                Email:
                <Input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  style={{ borderColor: isValidEmail ? "initial" : "red" }}
                  className="w-90 outline-none border-2 border-[#4b1544] rounded-2xl transition-all"
                />
              </label>
              <label>
                Message
                <Textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className="w-80 outline-none border-2 border-[#4b1544] rounded-2xl transition-all"
                />
              </label>
              <Button
                className="bg-[#2f163e] text-white font-bold my-2"
                type="submit"
              >
                SUBMIT
              </Button>
              {isValidEmail ? null : (
                <p style={{ color: "red" }}>Invalid email format</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
