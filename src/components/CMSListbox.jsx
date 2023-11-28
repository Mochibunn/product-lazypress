import React from "react";
import { Divider } from "@nextui-org/react";
import CMSStepsEdit from "./CMSStepsEdit";
import CMSRecipeInput from "./CMSRecipeInput";

export default function CMSListbox({ items, label, recipeId, section }) {
    return (
        <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <ul>
                {section !== "ingList" ? (
                    items.map((item, i) => (
                        <CMSRecipeInput
                            key={item.key}
                            item={item.value}
                            i={i}
                            length={items.length}
                            label={label}
                            recipeId={recipeId}
                            section={section}
                        />
                    ))
                ) : (
                    <p>Objects</p>
                )}
            </ul>
        </div>
    );
}
