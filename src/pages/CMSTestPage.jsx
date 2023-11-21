import { useParams } from "react-router-dom";
import { getBlog, editBlog, editBlogAuth, getAuth } from "../lib/dbClient";
import { useBlog } from "../lib/swr";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { Button } from "@nextui-org/react";
import CMSObjEdit from "../components/CMSObjEdit";
import { useAuth } from "@clerk/clerk-react";

// import CMSStrEdit from "../components/CMSStrEdit";

export default function CMSTestPage() {
    const { getToken } = useAuth();
    const { blogId } = useParams();
    const [blog, setBlog] = useImmer();
    const { swrBlog, isLoading } = useBlog(blogId);
    const [navBarInputValues, setNavBarInputValues] = useState();
    const [blogPagesValues, setBlogPagesValues] = useState();
    const [heroValues, setHeroValues] = useState();
    const [footerValues, setFooterValues] = useState();

    useEffect(() => {
        if (!swrBlog) return;
        console.log(swrBlog);

        // console.log(blog);

        const navBarValues = swrBlog.pages.home.navBar.map((page) => {
            const theValues = Object.entries(page).map(([key, value]) => ({
                value,
                label: key,
                key: crypto.randomUUID(),
            }));
            // console.log(theValues);
            return theValues;
        });

        const footerValues = swrBlog.pages.home.footer.map((page) => {
            const theValues = Object.entries(page).map(([key, value]) => ({
                value,
                label: key,
                key: crypto.randomUUID(),
            }));
            // console.log(theValues);
            return theValues;
        });

        const blogValues = swrBlog.pages.home.blogPages.map((page) => {
            const pageValues = Object.entries(page).map(([key, value]) => {
                return {
                    value,
                    label: key,
                    key: crypto.randomUUID(),
                };
            });
            // console.log(pageValues);
            return pageValues;
        });
        const heroValues = swrBlog.pages.home.hero.map((page) => {
            const theValues = Object.entries(page).map(([key, value]) => ({
                value,
                label: key,
                key: crypto.randomUUID(),
            }));
            // console.log(theValues);
            return theValues;
        });

        setNavBarInputValues([...navBarValues]);
        setFooterValues([...footerValues]);
        setBlogPagesValues([...blogValues]);
        setHeroValues([...heroValues]);
        setBlog(swrBlog);
    }, [swrBlog]);
    // getBlog(blogId).then((blog) => {
    //     // console.log(blog);

    //     const navBarValues = blog.pages.home.navBar.map((page) => {
    //         const theValues = Object.entries(page).map(([key, value]) => ({
    //             value,
    //             label: key,
    //             key: crypto.randomUUID(),
    //         }));
    //         // console.log(theValues);
    //         return theValues;
    //     });

    //     const footerValues = blog.pages.home.footer.map((page) => {
    //         const theValues = Object.entries(page).map(([key, value]) => ({
    //             value,
    //             label: key,
    //             key: crypto.randomUUID(),
    //         }));
    //         // console.log(theValues);
    //         return theValues;
    //     });

    //     const blogValues = blog.pages.home.blogPages.map((page) => {
    //         const pageValues = Object.entries(page).map(([key, value]) => {
    //             return {
    //                 value,
    //                 label: key,
    //                 key: crypto.randomUUID(),
    //             };
    //         });
    //         // console.log(pageValues);
    //         return pageValues;
    //     });
    //     const heroValues = blog.pages.home.hero.map((page) => {
    //         const theValues = Object.entries(page).map(([key, value]) => ({
    //             value,
    //             label: key,
    //             key: crypto.randomUUID(),
    //         }));
    //         // console.log(theValues);
    //         return theValues;
    //     });

    //     setNavBarInputValues([...navBarValues]);
    //     setFooterValues([...footerValues]);
    //     setBlogPagesValues([...blogValues]);
    //     setHeroValues([...heroValues]);
    //     setBlog(blog);
    // });
    // }, []);

    const saveChangesClick = async () => {
        // editBlog(blog)
        //     .then((response) => console.log(response))
        //     .catch((err) => console.error(err));
        try {
            const sessToken = await getToken();
            editBlog(sessToken, blog).then((res) =>
                console.log("came from protected route", res)
            );
        } catch (error) {
            console.error(error);
        }
        // getToken().then((token) => {
        //     editBlogAuth(token, blog).then((res) =>
        //         console.log("came from protected route", res)
        //     );
        // });
    };

    return (
        <div className="w-screen p-4">
            <h3>Home Page</h3>

            <CMSObjEdit
                sectionTitle={"NavBar Items"}
                section={"navBar"}
                sectionValues={navBarInputValues}
                setSectionValues={setNavBarInputValues}
                blog={blog}
                setBlog={setBlog}
            />
            <CMSObjEdit
                sectionTitle={"Footer Items"}
                section={"footer"}
                sectionValues={footerValues}
                setSectionValues={setFooterValues}
                blog={blog}
                setBlog={setBlog}
            />

            <CMSObjEdit
                sectionTitle={"Blog Pages"}
                section={"blogPages"}
                sectionValues={blogPagesValues}
                blog={blog}
                setBlog={setBlog}
            />
            <CMSObjEdit
                sectionTitle={"Hero Section"}
                section={"hero"}
                sectionValues={heroValues}
                blog={blog}
                setBlog={setBlog}
            />

            <Button className="mr-4" color="success" onClick={saveChangesClick}>
                Save Changes
            </Button>
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

//how formatting work for the CMSStrEdit Component-currently not used but could be useful later
// const navBarValues = blog.pages.home.navBar.map((item, i) => ({
//     value: item,
//     label: `Nav${i + 1}`,
// }));

// const footerValues = blog.pages.home.footer.map((item, i) => ({
//     value: item,
//     label: `Footer${i + 1}`,
// }));

/* <CMSStrEdit
                // key={"navBarKey"}
                sectionTitle={"NavBar Items"}
                section={"navBar"}
                sectionValues={navBarInputValues}
                setSectionValues={setNavBarInputValues}
                blog={blog}
                setBlog={setBlog}
            />
            
            <CMSStrEdit
                // key={"footerKey"}
                sectionTitle={"Footer Items"}
                section={"footer"}
                sectionValues={footerValues}
                setSectionValues={setFooterValues}
                blog={blog}
                setBlog={setBlog}
            /> */

//Tests for figuring out how to use useEffect with async/await and to fetch needed data
// blog &&
//     editBlogAuth(blog).then((res) =>
//         console.log("came from protected route", res)
//     );
// useEffect(() => {
//     (async () => {
//         try {
//             const sessToken = await getToken();
//             getAuth(sessToken).then((res) => console.log(res));
//             blog &&
//                 editBlogAuth(sessToken, blog).then((res) =>
//                     console.log("came from protected route", res)
//                 );
//         } catch (error) {
//             console.error(error);
//         }
//     })();
//     // getToken().then((token) => {
//     //     getAuth(token).then((res) => console.log(res));
//     //     blog &&
//     //         editBlogAuth(token, blog).then((res) =>
//     //             console.log("came from protected route", res)
//     //         );
//     // });
// }, [blog]);
