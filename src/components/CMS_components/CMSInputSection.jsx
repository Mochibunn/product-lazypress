import CMSInput from "./CMSInput";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useBlog } from "../../lib/swr";
import { produce } from "immer";
import { toastSuccess, toastError } from "../../lib/toastify";

export default function CMSInputSection({
    array,
    i: sectionIndex,
    section,
    sectionTitle,
}) {
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

    const handleImgUpload = (url, i) => {
        const values = [...localValues];
        // console.log(values);
        values[i].value = url;
        setLocalValues(values);
    };

    const editSection = (e) => {
        e.preventDefault();

        let isValid = true;

        // console.log("localvalues", localValues);

        localValues.forEach((value) => {
            if (!value.value) {
                toastError(`${value.label} is required`);
                isValid = false;
            }
            if (value.label === "imgUrl") {
                // console.log(value.value);
                if (
                    !value.value.match(
                        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
                    )
                ) {
                    toastError(`Image URL must be a valid URL`);
                    isValid = false;
                }
            }
        });

        if (!isValid) return;

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
        toastSuccess(
            `Draft updated.  To save and add to website click "Save Changes"`
        );
    };
    const deleteSection = () => {
        // console.log(swrBlog.pages.home[section][sectionIndex]);
        if (swrBlog.pages.home[section].length === 1) {
            return toastError(`Must have at least one item in ${sectionTitle}`);
        }
        mutateBlog(
            produce((draftBlog) => {
                draftBlog.pages.home[section].splice(sectionIndex, 1);
            }),
            { optimisticData: swrBlog, revalidate: false }
        );
        toastSuccess(
            `Section deleted from draft. To save and add to website click "Save Changes"`
        );
    };

    return (
        <div className="my-2 border-1 rounded-xl border-default-100 flex flex-col align-text-bottom w-full">
            <div className="m-2">
                <h3 className="text-md font-montserrat bg-neutral-300 rounded-xl font-semibold p-2">
                    {section === "hero" ? "Slide" : "Item"}{" "}
                    {`${sectionIndex + 1}`}
                </h3>
                <form
                    className={
                        section !== "hero" &&
                        "flex items-center justify-between"
                    }
                    onSubmit={editSection}
                >
                    {array &&
                        array.map((obj, i) => {
                            return (
                                <CMSInput
                                    key={`${obj.label}_${obj.key}`}
                                    valueObj={obj}
                                    i={i}
                                    sectionIndex={sectionIndex}
                                    onChange={handleArrayValueChange}
                                    setUrl={handleImgUpload}
                                />
                            );
                        })}
                    <div className="flex justify-end gap-2">
                        {section === "hero" && (
                            <Button
                                onClick={deleteSection}
                                color="danger"
                                className="hover:bg-warning"
                            >
                                Delete Slide
                            </Button>
                        )}
                        <Button
                            color="secondary"
                            // className="w-1/4 m-2"
                            type="submit"
                        >
                            Edit {section === "hero" ? "Slide" : "Item"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
