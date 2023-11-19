import CMSInput from "./CMSInput";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

export default function CMSNavEdit({
    navBarInputValues,
    setNavBarInputValues,
    blog,
    setBlog,
}) {
    // const [navBarInputValues, setNavBarInputValues] = useState();

    // useEffect(() => {
    //     if (!blog) return;
    //     const navBarValues = blog.pages.home.navBar.map((item, i) => ({
    //         value: item,
    //         label: `Nav${i + 1}`,
    //     }));
    //     setNavBarInputValues([...navBarValues]);
    // }, []);

    const handleNavBarChange = (e, i) => {
        const values = [...navBarInputValues];
        values[i].value = e.target.value;
        setNavBarInputValues(values);
    };

    const editHeader = (e) => {
        e.preventDefault();
        // console.log(blog);
        // console.log(navBarInputValues);
        const onlyValues = navBarInputValues.map((obj) => {
            // console.log(obj);
            return obj.value;
        });
        setBlog((draft) => {
            draft.pages.home.navBar = onlyValues;
        });
    };
    return (
        <>
            {navBarInputValues && (
                <div className="w-3/4 p-4 border-solid border-2 border-black">
                    <h3>NavBar Items</h3>
                    <form className="flex" onSubmit={editHeader}>
                        {navBarInputValues.map((obj, i) => {
                            return (
                                <CMSInput
                                    //with a key it leaves the input every time which is annoying
                                    key={crypto.randomUUID()}
                                    valueObj={obj}
                                    i={i}
                                    onChange={handleNavBarChange}
                                />
                            );
                        })}
                        <Button type="submit">Edit NavBar</Button>
                    </form>
                </div>
            )}
        </>
    );
}
