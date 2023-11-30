import React from "react";
import CMSRecipeInput from "./CMSRecipeInput";
import CMSIngInputs from "./CMSIngInputs";

export default function CMSListbox({
    items,
    label,
    recipeId,
    section,
    setDraftSaved,
}) {
    // console.log(items);
    return (
        <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <ul>
                {section !== "ingList"
                    ? items.map((item, i) => (
                          <CMSRecipeInput
                              key={item.key}
                              item={item.value}
                              i={i}
                              length={items.length}
                              label={label}
                              recipeId={recipeId}
                              section={section}
                              setDraftSaved={setDraftSaved}
                          />
                      ))
                    : items.map((item, i) => (
                          <CMSIngInputs
                              key={item._id || item.key}
                              item={item}
                              i={i}
                              length={items.length}
                              recipeId={recipeId}
                              section={section}
                              setDraftSaved={setDraftSaved}
                          />
                      ))}
            </ul>
        </div>
    );
}
