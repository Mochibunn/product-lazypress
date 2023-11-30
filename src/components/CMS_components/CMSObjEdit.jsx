import { Button } from "@nextui-org/react";
import CMSInputSection from "./CMSInputSection";
import CMSAddModal from "./CMSAddModal";

export default function CMSObjEdit({ sectionTitle, section, sectionValues }) {
    return (
        <>
            {sectionValues && (
                <div>
                    {/* <h3>{sectionTitle}</h3> */}
                    {section === "hero" && (
                        <Button>
                            <CMSAddModal
                                sectionTitle={sectionTitle}
                                section={section}
                            />
                        </Button>
                    )}
                    {sectionValues.map((page, i) => {
                        return (
                            <CMSInputSection
                                key={`${section}_page_${i + 1}_${page[0].key}`}
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
