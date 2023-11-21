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
                    <h3 className="text-3xl font-semibold">{sectionTitle}</h3>

                    {sectionValues.map((page, i) => {
                        return (
                            <CMSInputSection
                                key={`page_${i + 1}_${page[i].key}`}
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
