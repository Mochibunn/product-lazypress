import React from "react";
import CMSAddRecipeInput from "./CMSAddRecipeInput";
import CMSAddIngInputs from "./CMSAddIngInputs";

export default function CMSAddListbox({ items, label, section, setNewRecipe }) {
    // console.log(items);
    return (
        <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <ul>
                {section !== "ingList"
                    ? items?.map((item, i) => (
                          <CMSAddRecipeInput
                              key={item.key}
                              item={item.value}
                              i={i}
                              length={items.length}
                              label={label}
                              section={section}
                              setNewRecipe={setNewRecipe}
                          />
                      ))
                    : items?.map((item, i) => (
                          <CMSAddIngInputs
                              key={item.key}
                              item={item}
                              i={i}
                              length={items.length}
                              section={section}
                              setNewRecipe={setNewRecipe}
                          />
                      ))}
            </ul>
        </div>
    );
}
