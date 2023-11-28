import React from "react";
import { Divider } from "@nextui-org/react";
import CMSStepsEdit from "./CMSStepsEdit";
import CMSRecipeInput from "./CMSRecipeInput";

export default function CMSListbox({ items }) {
    return (
        <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <ul>
                {items.map((step, i) => (
                    <>
                        <CMSRecipeInput
                            key={crypto.randomUUID()}
                            step={step}
                            i={i}
                        />
                        {i !== items.length - 1 && <Divider />}
                    </>
                ))}
            </ul>
        </div>
    );
}
