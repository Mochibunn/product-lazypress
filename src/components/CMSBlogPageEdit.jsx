import CMSInput from "./CMSInput";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import CMSInputSection from "./CMSInput Section";

export default function CMSBlogPageEdit({ blog, setBlog }) {
    const [blogPagesValues, setBlogPagesValues] = useState();

    useEffect(() => {
        if (!blog) return;
        const blogValues = blog.pages.home.blogPages.map((page) => {
            const pageValues = Object.entries(page).map(([key, value]) => ({
                value,
                label: key,
            }));
            return pageValues;
        });
        setBlogPagesValues([...blogValues]);
    }, [blog]);
    return (
        <>
            {blogPagesValues && (
                <div>
                    <h3>Searchpage Items</h3>
                    <form>
                        {blogPagesValues.map((page, i) => {
                            return (
                                <div className="my-2 border-2 border-black flex flex-col w-full">
                                    <h3>Page {`${i + 1}`}</h3>
                                    <CMSInputSection array={page} />
                                </div>
                            );
                        })}
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            )}
        </>
    );
}
