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
                            <CMSInputSection
                                key={`${section}_page_${i + 1}`}
                                blog={blog}
                                setBlog={setBlog}
                                array={page}
                                i={i}
                                section={section}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}
