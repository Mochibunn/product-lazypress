import CMSInput from "./CMSInput";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useBlog } from "../lib/swr";
import { produce } from "immer";

export default function CMSInputSection({ array, i: sectionIndex, section }) {
    const [localValues, setLocalValues] = useState(array);
    const { blogId } = useParams();
    const { swrBlog, mutateBlog } = useBlog(blogId);

    //useCallBack for performance if time
    const handleArrayValueChange = (e, i) => {
        const values = [...localValues];
        console.log(values);
        values[i].value = e.target.value;
        setLocalValues(values);
    };

    const editSection = (e) => {
        e.preventDefault();
        console.log("localvalues", localValues);
        const asArrays = localValues.map((obj) => {
            const objAsArray = [obj.label, obj.value];

            return objAsArray;
        });
        const singleObj = Object.fromEntries(asArrays);

        mutateBlog(
            produce((draftBlog) => {
                draftBlog.pages.home[section][sectionIndex] = singleObj;
            }),
            { optimisticData: swrBlog, revalidate: false }
        );
    };
    const deleteSection = () => {
        console.log(swrBlog.pages.home[section][sectionIndex]);
        mutateBlog(
            produce((draftBlog) => {
                draftBlog.pages.home[section].splice(sectionIndex, 1);
            }),
            { optimisticData: swrBlog, revalidate: false }
        );
    };

    return (
        <div className="my-2 border-2 rounded-lg border-tiffany-blue flex flex-col w-3/4">
          <div className="m-2">
            <h3 className="text-xl font-bold">Page {`${sectionIndex + 1}`}</h3>
            <form onSubmit={editSection}>
                {array &&
                    array.map((obj, i) => {
                        return (
                            <CMSInput
                                key={`${obj.label}_${obj.key}`}
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
        </div>
    );
}
