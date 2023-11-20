import CMSInput from "./CMSInput";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@nextui-org/react";

export default function CMSObjInputSct({
    object,
    i: sectionIndex,
    setBlog,
    blog,
    section,
}) {
    // console.log("test array: ", array);
    const [localValues, setLocalValues] = useState();
    const [localForm, setLocalForm] = useState({ ...object });

    // const handleArrayValueChange = (e, i) => {
    //     const values = [...localValues];
    //     console.log(values);
    //     // console.log("index value:", values[i].value);
    //     // console.log("e.target.value", e.target.value);
    //     values[i].value = e.target.value;
    //     setLocalValues(values);
    // };

    const handleObjChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setLocalForm((prev) => ({ ...prev, [name]: value }));
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
            draft.pages.home[section][sectionIndex] = singleObj;
        });
    };

    return (
        <div className="my-2 border-2 border-black flex flex-col w-3/4">
            <h3>Page {`${sectionIndex + 1}`}</h3>
            <form onSubmit={editSection}>
                {object &&
                    Object.entries(object).map(([key, value]) => {
                        return (
                            <CMSInput
                                key={`${key}_${object.key}`}
                                // key={`${section}_page${sectionIndex + 1}${
                                //     obj.label
                                // }_${obj.schemaId}`}
                                // key={`${
                                //     section + "_page_" + (sectionIndex + 1)
                                // }_${obj.label}`}
                                valueObj={{ label: key, value }}
                                onChange={handleObjChange}
                            />
                        );
                    })}
                <Button className="w-1/4" type="submit">
                    Edit Section
                </Button>
            </form>
        </div>
    );
}
