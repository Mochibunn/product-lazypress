import CMSObjInputSct from "./CMSObjInputSct";

export default function CMSDblObjEdit({
    sectionTitle,
    section,
    sectionArray,
    blog,
    setBlog,
}) {
    console.log(sectionArray);

    return (
        <div className="my-2 border-2 border-black flex flex-col w-3/4">
            <h3>DblObj Test area</h3>
            {sectionArray && (
                <div>
                    <h3>{sectionTitle}</h3>

                    {sectionArray.map((page, i) => {
                        return (
                            <CMSObjInputSct
                                key={`page_${i + 1}_${page.key}`}
                                blog={blog}
                                setBlog={setBlog}
                                object={page}
                                i={i}
                                section={section}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
