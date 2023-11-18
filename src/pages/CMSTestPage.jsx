import { useParams } from "react-router-dom";
import { getBlog } from "../lib/dbClient";
import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { Button } from "@nextui-org/react";
import CMSInput from "../components/CMSInput";
import CMSNavEdit from "../components/CMSNavEdit";
import CMSBlogPageEdit from "../components/CMSBlogPageEdit";

export default function CMSPage() {
    const { blogId } = useParams();
    const [blog, setBlog] = useImmer();

    // const [navBarInputValues, setNavBarInputValues] = useState();
    // const [blogPagesValues, setBlogPagesValues] = useState();

    useEffect(() => {
        getBlog(blogId).then((blog) => {
            const navBarValues = blog.pages.home.navBar.map((item, i) => ({
                value: item,
                label: `Nav${i + 1}`,
            }));
            const blogValues = blog.pages.home.blogPages.map((page) => {
                const pageValues = Object.entries(page).map(([key, value]) => ({
                    value,
                    label: key,
                }));
                return pageValues;
            });
            console.log([...blogValues]);
            setBlog(blog);
            // setNavBarInputValues([...navBarValues]);
            // setBlogPagesValues([...blogValues]);
        });
    }, []);
    // console.log(blog);
    // console.log(blog?.pages.home.navBar);

    // const handleBlogPageChange = (e, i) => {
    //     const values = [...blogPagesValues];
    //     values[i].value = e.target.value;
    //     setBlogPagesValues(values);
    // };

    return (
        <div className="w-screen">
            <h3>Home Page</h3>
            <CMSNavEdit blog={blog} setBlog={setBlog} />
            <CMSBlogPageEdit blog={blog} setBlog={setBlog} />
            {/* {blogPagesValues && (
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
            )} */}
            <Button
                onClick={() => {
                    console.log(blog.pages);
                }}
            >
                Log Stuff
            </Button>
        </div>
    );
}
