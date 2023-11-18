import CMSInput from "./CMSInput";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

export default function CMSInputSection({ array, i, setBlog, blog }) {
    // console.log("test array: ", array);
    const [localValues, setLocalValues] = useState(array);
    const handleArrayValueChange = (e, i) => {
        const values = [...localValues];
        values[i].value = e.target.value;
        setLocalValues(values);
    };

    const editSection = (e) => {
        e.preventDefault();
        console.log("localvalues", localValues);
        const asObject = localValues.map((obj) => {
            // console.log(obj);
            return obj.value;
        });
        console.log("asobject", asObject);
        console.log("blog notation", blog.pages.home.blogPages[i]);
        // setBlog((draft) => {
        //      draft.pages.home.blogPages = onlyValues;
        // });
    };
    return (
        <form onSubmit={editSection}>
            {array.map((obj, i) => {
                return (
                    <CMSInput
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
