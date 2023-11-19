import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import CMSInputSection from "./CMSInputSection";

export default function CMSObjEdit({
    sectionTitle,
    section,
    sectionValues,
    blog,
    setBlog,
}) {
    return (
        <>
            {sectionValues && (
                <div>
                    <h3>{sectionTitle}</h3>

                    {sectionValues.map((page, i) => {
                        return (
                            <div
                                //works now with key, but causes rerender-will need to use useRef I think
                                key={crypto.randomUUID()}
                                className="my-2 border-2 border-black flex flex-col w-3/4"
                            >
                                <h3>Page {`${i + 1}`}</h3>
                                <CMSInputSection
                                    blog={blog}
                                    setBlog={setBlog}
                                    array={page}
                                    i={i}
                                    section={section}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}
