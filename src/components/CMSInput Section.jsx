import CMSInput from "./CMSInput";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

export default function CMSInputSection({ array }) {
    const [navBarInputValues, setNavBarInputValues] = useState();

    const handleNavBarChange = (e, i) => {
        const values = [...navBarInputValues];
        values[i].value = e.target.value;
        setNavBarInputValues(values);
    };

    const editHeader = (e) => {
        e.preventDefault();
        // console.log(blog);
        // console.log(navBarInputValues);
        const onlyValues = navBarInputValues.map((obj) => {
            // console.log(obj);
            return obj.value;
        });
        setBlog((draft) => {
            draft.pages.home.navBar = onlyValues;
        });
    };
    return (
        <>
            {array.map((obj, i) => {
                return (
                    <CMSInput
                        valueObj={obj}
                        i={i}
                        // onChange={handleBlogPageChange}
                    />
                );
            })}
        </>
    );
}
