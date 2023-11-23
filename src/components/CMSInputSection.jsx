import CMSInput from "./CMSInput";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@nextui-org/react";

export default function CMSInputSection({
  array,
  i: sectionIndex,
  setBlog,
  blog,
  section,
}) {
  // console.log("test array: ", array);
  const [localValues, setLocalValues] = useState(array);

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
        </form>
      </div>
    </div>
  );
}
