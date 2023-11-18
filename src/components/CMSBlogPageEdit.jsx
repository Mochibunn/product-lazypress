import CMSInput from "./CMSInput";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

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
                                    {page.map((obj, i) => {
                                        const handleBlogPageChange = (e, i) => {
                                            const values = [...blogPagesValues];
                                            values[i].value = e.target.value;
                                            setBlogPagesValues(values);
                                        };
                                        return (
                                            <CMSInput
                                                valueObj={obj}
                                                i={i}
                                                onChange={handleBlogPageChange}
                                            />
                                        );
                                    })}
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
