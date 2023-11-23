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
    <div className="my-2 border-1 rounded-xl border-default-20100 flex flex-col align-text-bottom w-full">
      <div className="m-2">
        <h3 className="text-md font-montserrat bg-neutral-300 rounded-xl font-semibold p-2">Page {`${sectionIndex + 1}`}</h3>
        <form onSubmit={editSection}>
          {array &&
            array.map((obj, i) => {
              return (
                <CMSInput
                  key={`${obj.label}_${obj.key}`}
                  valueObj={obj}
                  i={i}
									sectionIndex={sectionIndex}
                  onChange={handleArrayValueChange}
									/>
              );
            })}
          <Button className="w-1/4 m-2" type="submit">
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
