import CMSInput from "./CMSInput";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

export default function CMSNavEdit({
    sectionTitle,
    section,
    sectionValues,
    setSectionValues,
    blog,
    setBlog,
}) {
    const handleValueChange = (e, i) => {
        const values = [...sectionValues];
        values[i].value = e.target.value;
        setSectionValues(values);
    };

    const editSection = (e) => {
        e.preventDefault();
        // console.log(blog);
        // console.log(sectionValues);
        const onlyValues = sectionValues.map((obj) => {
            // console.log(obj);
            return obj.value;
        });
        setBlog((draft) => {
            draft.pages.home[section] = onlyValues;
        });
    };
    return (
        <>
            {sectionValues && (
                <div className="w-3/4 p-4 border-solid border-2 border-black">
                    <h3>{sectionTitle}</h3>
                    <form className="flex" onSubmit={editSection}>
                        {sectionValues.map((obj, i) => {
                            return (
                                <CMSInput
                                    key={`${obj.label}`}
                                    valueObj={obj}
                                    i={i}
                                    onChange={handleValueChange}
                                />
                            );
                        })}
                        <Button type="submit">Edit Section</Button>
                    </form>
                </div>
            )}
        </>
    );
}
