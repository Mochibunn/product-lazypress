import { useBlog } from "../lib/swr";
import { editBlog } from "../lib/dbClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { produce } from "immer";
import CMSObjEdit from "../components/CMS_components/CMSObjEdit";
import CMSRecipes from "../components/CMS_components/CMSRecipes";
import { toastSuccess, toastError } from "../lib/toastify";
import {
    Accordion,
    AccordionItem,
    Button,
    Tabs,
    Tab,
    Textarea,
    Spinner,
    Card,
    CardBody,
} from "@nextui-org/react";
import {
    CgClapperBoard,
    CgClipboard,
    CgDrive,
    CgHome,
    CgImage,
    CgPen,
    CgWebsite,
} from "react-icons/cg";

export default function CMSTestPage() {
    const { blogId } = useParams();
    const [navBarInputValues, setNavBarInputValues] = useState();
    const [cardValues, setCardValues] = useState();
    const [footerValues, setFooterValues] = useState();
    const [blogTitle, setBlogTitle] = useState("");
    const { swrBlog, isLoading, mutateBlog } = useBlog(blogId);
    const [heroValues, setHeroValues] = useState();
    const { getToken } = useAuth();
    document.title = `Edit "${blogTitle ? blogTitle : "Page"}" | LazyPress`;
    // const [buttonSpin, setButtonSpin] = useState(false); Might remove this line later — Mochi

    // const notify = (content, mode) => toast(content, {theme: `${mode || "light"}`});

    //toastify stuff moved to toastify.js in lib folder

    useEffect(() => {
        if (isLoading) return;
        console.log("useEffect called");

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

        const cardValues = swrBlog.pages.home.cards.map((page) => {
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
        setBlogTitle(swrBlog.dashboard.blogTitle);
        setNavBarInputValues([...navBarValues]);
        setFooterValues([...footerValues]);
        setCardValues([...cardValues]);
        setHeroValues([...heroValues]);
    }, [swrBlog, isLoading]);

    const handleSetTitle = () => {
        if (!blogTitle.length) return toastError(`Title cannot be blank.`);
        mutateBlog(
            produce((draftBlog) => {
                draftBlog.dashboard.blogTitle = blogTitle;
            }),
            { optimisticData: swrBlog, revalidate: false }
        );
        toastSuccess(
            `Title draft updated. To save and add to website click "Save Changes"`
        );
        // toast.success(`Title set.`, {
        //     toastId: "titleSaved",
        //     ...toastSettings,
        // });
    };

    const discardChangesClick = async () => {
        try {
            await mutateBlog();
            toastSuccess(`Draft successfully discarded`);
        } catch (error) {
            toastError(error.message);
        }
    };

    const saveChangesClick = async () => {
        // setButtonSpin(true); Might remove this line later — Mochi
        try {
            const sessToken = await getToken();

            const response = await editBlog(sessToken, swrBlog);

            console.log("came from protected route", response?.status);
            // console.log(`🐰Status:\n`, postStatus.status);
            // console.log(`AAAAA\n`, swrBlog);
            if (response?.status === 200) {
                await mutateBlog();
                toastSuccess(`Changes saved, and can be seen on your website.`);
            }

            // setButtonSpin(false); Might remove this line later — Mochi
        } catch (error) {
            //update to show specific error message
            toastError(`${error}`);
            console.error(error);
        }
    };

    if (isLoading) return <Spinner />;
    return (
        <div className="w-full p-4 min-h-screen bg-tiffany-blue/20">
            {/* <h1 className="watermark text-[150px] text-center">DESIGN WORK IN PROGRESS</h1> Uncomment this during presentation */}
            <Card className="mt-2 mb-6 mx-2 px-2 py-2 shadow-sm">
                <CardBody>
                    <div aria-hidden className="flex rounded-lg">
                        <h3 className="text-4xl font-semibold font-metropolis">
                            Edit
                        </h3>
                        <Textarea
                            minRows={1}
                            placeholder="Page"
                            onValueChange={setBlogTitle}
                            variant="underlined"
                            className="cms-title cms-txtarea"
                            value={blogTitle}
                        />
                    </div>
                    <Button
                        onPress={handleSetTitle}
                        color="secondary"
                        radius="sm"
                        variant="ghost"
                        className="font-metropolis w-1/12 mt-4"
                        startContent={<CgPen />}
                    >
                        Set title
                    </Button>
                </CardBody>
            </Card>
            <Tabs
                aria-label="Site Pages"
                className="ml-3 w-1/2 h-full"
                classNames={{
                    tabList: "w-full h-12 bg-default",
                    cursor: "h-15",
                    tab: "text-xl font-bold mx-1",
                    tabContent: "",
                }}
            >
                <Tab
                    key="home"
                    title={
                        <div className="flex items-center space-x-2">
                            <CgHome />
                            <span>Home</span>
                        </div>
                    }
                    className="font-metropolis"
                >
                    <div aria-hidden className="w-10/12">
                        <Accordion
                            variant="splitted"
                            className="font-metropolis"
                        >
                            <AccordionItem
                                key="1"
                                title="Navbar Items"
                                subtitle=""
                                startContent={<CgDrive />}
                            >
                                <CMSObjEdit
                                    sectionTitle={"NavBar Items"}
                                    section={"navBar"}
                                    sectionValues={navBarInputValues}
                                    setSectionValues={setNavBarInputValues}
                                />
                            </AccordionItem>
                            <AccordionItem
                                key="Hero Section"
                                title="Hero Section"
                                subtitle=""
                                startContent={<CgImage />}
                            >
                                <CMSObjEdit
                                    sectionTitle={"Hero Section"}
                                    section={"hero"}
                                    sectionValues={heroValues}
                                />
                            </AccordionItem>
                            {cardValues?.length && (
                                <AccordionItem
                                    key="cards"
                                    title="Cards"
                                    startContent={<CgWebsite />}
                                >
                                    <CMSObjEdit
                                        // sectionTitle={"Blog Pages"}
                                        section={"cards"}
                                        sectionValues={cardValues}
                                    />
                                </AccordionItem>
                            )}
                            <AccordionItem
                                key="Footer Items"
                                title="Footer Items"
                                subtitle=""
                                startContent={<CgClapperBoard />}
                            >
                                <CMSObjEdit
                                    sectionTitle={"Footer Items"}
                                    section={"footer"}
                                    sectionValues={footerValues}
                                    setSectionValues={setFooterValues}
                                />
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="w-10/12 flex justify-end mt-4 gap-2">
                        {/* <Button
                            onClick={() => {
                                console.log("swrBlog\n", swrBlog);
                                toastSuccess(`Check your development console!`);
                            }}
                        >
                            Log Stuff
                        </Button> */}
                        <Button
                            className="hover:bg-warning"
                            color="danger"
                            radius="sm"
                            variant="flat"
                            onClick={discardChangesClick}
                        >
                            Discard Draft
                        </Button>
                        <Button
                            // className="mx-3"
                            color="success"
                            radius="sm"
                            onClick={saveChangesClick}
                        >
                            Save Changes
                        </Button>
                    </div>
                </Tab>
                {/* Used only in preview pages now, but integrated into Home tab. */}
                {/* <Tab
                    key="cardsTab"
                    title={
                        <div className="flex items-center space-x-2">
                            <CgWebsite />
                            <span>Cards</span>
                        </div>
                    }
                    className="font-metropolis"
                >
                    <div aria-hidden className="w-10/12">
                        <Accordion variant="splitted">
                            <AccordionItem
                                key="cards"
                                title="Cards"
                                startContent={<CgWebsite />}
                            >
                                <CMSObjEdit
                                    // sectionTitle={"Blog Pages"}
                                    section={"cards"}
                                    sectionValues={cardValues}
                                />
                            </AccordionItem>
                        </Accordion>
                    </div>
                </Tab> */}
                <Tab
                    key="recipes"
                    title={
                        <div className="flex items-center space-x-2">
                            <CgClipboard />
                            <span>Recipes</span>
                        </div>
                    }
                    className="font-metropolis"
                >
                    <div className="min-h-[50vh]">
                        <CMSRecipes
                            clerkUser={swrBlog.clerkUser}
                            clerkUserId={swrBlog.clerkUserId}
                            blog={swrBlog._id}
                        />
                    </div>
                </Tab>
            </Tabs>
            {/* <ToastContainer />{" "} */}
            {/* Perhaps we could put it in the root of our app */}
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
