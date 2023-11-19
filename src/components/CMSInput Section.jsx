import CMSInput from "./CMSInput";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

export default function CMSInputSection({ array, i, setBlog, blog }) {
    // console.log("test array: ", array);
    const [localValues, setLocalValues] = useState(array);
    const handleArrayValueChange = (e, i) => {
        const values = [...localValues];
        console.log(values);
        values[i].value = e.target.value;
        setLocalValues(values);
    };

    const editSection = (e) => {
        e.preventDefault();
        console.log("localvalues", localValues);
        const asArrays = localValues.map((obj) => {
            const objAsArray = [obj.label, obj.value];
            // const usableObj = Object.fromEntries(objAsArray);
            // console.log(obj);
            return objAsArray;
        });
        // console.log("asArrays", asArrays);
        const singleObj = Object.fromEntries(asArrays);
        // console.log("singleObj", singleObj);
        // console.log("blog notation", blog.pages.home.blogPages[i]);
        setBlog((draft) => {
            draft.pages.home.blogPages[i] = singleObj;
        });
    };
    return (
        <form onSubmit={editSection}>
            {array &&
                array.map((obj, i) => {
                    return (
                        <CMSInput
                            key={crypto.randomUUID()}
                            valueObj={obj}
                            i={i}
                            onChange={handleArrayValueChange}
                        />
                    );
                })}
            <Button className="w-1/4" type="submit">
                Edit Section
            </Button>
        </form>
    );
}
