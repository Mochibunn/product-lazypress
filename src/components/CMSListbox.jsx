import React from "react";
import { Divider } from "@nextui-org/react";
import CMSStepsEdit from "./CMSStepsEdit";

export default function CMSListbox({ steps }) {
    const items = [
        {
            key: "new",
            label: "New file",
        },
        {
            key: "copy",
            label: "Copy link",
        },
        {
            key: "edit",
            label: "Edit file",
        },
        {
            key: "delete",
            label: "Delete file",
        },
    ];

    return (
        <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <ul>
                {steps.map((step, i) => (
                    <>
                        <CMSStepsEdit step={step} />
                        {i !== steps.length - 1 && <Divider />}
                    </>
                ))}
            </ul>
        </div>
    );
}
