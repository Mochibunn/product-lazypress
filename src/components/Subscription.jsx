import { useState } from "react";
import { Button } from "@nextui-org/react";

export default function Subscription() {
  const [form, setForm] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <div>
        <h4 className="text-2xl p-4 px-8">We really want you to want us! </h4>
      </div>
      <div className="flex justify-evenly">
        <p>Enter your email to subscribe to update.</p>
        <form
          //   onSubmit={handleLogin}
          autoComplete="off"
          className="flex items-start bg-base-300 pt-4 rounded overflow-hidden mx-auto my-0 w-2/3 sm:w-1/2 2xl:w-2/3 transition-all"
        >
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-3/5 mb-8 p-2 outline-none border-2 border-black-3 focus:pink-lavender bg-thistle rounded transition-all"
          />
          <Button className="color-celadon bg-celadon">Subscribe</Button>
        </form>
      </div>
    </div>
  );
}
