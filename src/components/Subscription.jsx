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
        <div >
            <div className="pt-4 flex flex-col items-center">
                <h4 className="text-2xl text-center">
                    We really want you to want us!{" "}
                </h4>
                <p>Enter your email to subscribe to update.</p>
                <form
                    autoComplete="off"
                    className="flex justify-center ml-10 bg-base-300 pt-4 rounded overflow-hidden  my-0 w-2/3 sm:w-1/2 2xl:w-2/3 transition-all gap-2"
                   
                >
                    <input
                        type="text"
                        placeholder="E-mail"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-3/5 mb-8 outline-none border-2 border-black-3 focus:white  transition-all glassInput"
                        style={{backgroundColor:'#AEE5D8'}}
                    />
                    <Button className="jellyButtonNavBar">Subscribe</Button>
                </form>
            </div>
           
        </div>
    );
}
