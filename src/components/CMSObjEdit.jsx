import { Button } from "@nextui-org/react";
import CMSInputSection from "./CMSInputSection";
import CMSAddModal from "./CMSAddModal";

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
                    {(section === "blogPages" || section === "hero") && (
                        <Button>
                            <CMSAddModal
                                sectionTitle={sectionTitle}
                                section={section}
                                setBlog={setBlog}
                            />
                        </Button>
                    )}
                    {sectionValues.map((page, i) => {
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
