import CMSInput from "./CMSInput";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useBlog } from "../lib/swr";
import { produce } from "immer";

export default function CMSInputSection({
    array,
    i: sectionIndex,
    setBlog,
    blog,
    section,
}) {
    const [localValues, setLocalValues] = useState(array);
    const { blogId } = useParams();
    const { swrBlog, mutateBlog } = useBlog(blogId);

    // const generatedKeys = useMemo(
    //     () => array.map((item) => crypto.randomUUID()),
    //     [array]
    // );

    //useCallBack for performance if time
    const handleArrayValueChange = (e, i) => {
        const values = [...localValues];
        console.log(values);
        // console.log("index value:", values[i].value);
        // console.log("e.target.value", e.target.value);
        values[i].value = e.target.value;
        setLocalValues(values);
    };

    const editSection = (e) => {
        e.preventDefault();
        console.log("localvalues", localValues);
        const asArrays = localValues.map((obj) => {
            const objAsArray = [obj.label, obj.value];
            // const usableObj = Object.fromEntries(objAsArray);
            // console.log(obj);
            return objAsArray;
        });
        // console.log("asArrays", asArrays);
        const singleObj = Object.fromEntries(asArrays);
        // console.log("singleObj", singleObj);
        // console.log("blog notation", blog.pages.home.blogPages[i]);

        setBlog((draft) => {
            draft.pages.home[section][sectionIndex] = singleObj;
        });
    };
    const deleteSection = () => {
        console.log(swrBlog.pages.home[section][sectionIndex]);
        setBlog((draft) => {
            draft.pages.home[section].splice(sectionIndex, 1);
        });
        // mutateBlog(
        //     produce((draftBlog) => {
        //         const updatedSection = draftBlog.pages.home[section].toSpliced(
        //             sectionIndex,
        //             1
        //         );
        //         draftBlog.pages.home[section] = updatedSection;
        //     }),
        //     { optimisticData: swrBlog, revalidate: false }
        // );
    };

    return (
        <div className="my-2 border-2 border-black flex flex-col w-3/4">
            <h3 className="text-xl font-bold">Page {`${sectionIndex + 1}`}</h3>
            <form onSubmit={editSection}>
                {array &&
                    array.map((obj, i) => {
                        return (
                            <CMSInput
                                key={`${obj.label}_${obj.key}`}
                                // key={`${section}_page${sectionIndex + 1}${
                                //     obj.label
                                // }_${obj.schemaId}`}
                                // key={`${
                                //     section + "_page_" + (sectionIndex + 1)
                                // }_${obj.label}`}
                                valueObj={obj}
                                i={i}
                                onChange={handleArrayValueChange}
                            />
                        );
                    })}
                <Button className="w-1/4" type="submit">
                    Edit Section
                </Button>
                {(section === "blogPages" || section === "hero") && (
                    <Button onClick={deleteSection} color="danger">
                        Delete Section
                    </Button>
                )}
            </form>
        </div>
    );
}
