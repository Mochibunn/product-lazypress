import { useMemo } from "react";
import CMSInputSection from "./CMSInputSection";

export default function CMSObjEdit({
    sectionTitle,
    section,
    sectionValues,
    blog,
    setBlog,
}) {
    // console.log(sectionValues);

    return (
        <>
            {sectionValues && (
                <div>
                    <h3>{sectionTitle}</h3>

                    {sectionValues.map((page, i) => {
                        if (i == 5) console.log(page[0]);
                        return (
                            <CMSInputSection
                                key={`${section}_page_${i + 1}_${page[0].key}`}
                                // key={`${page[0].schemaId}`}
                                // key={`${section}_page_${i + 1}`}
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
