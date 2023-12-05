import { useState } from "react";
import { Button, Input, Textarea, Divider } from "@nextui-org/react";
import { useRecipe } from "../../lib/swr";
import { produce } from "immer";
import { toastError, toastSuccess } from "../../lib/toastify";

export default function CMSRecipeInput({
    item,
    i,
    length,
    label,
    recipeId,
    section,
    setDraftSaved,
}) {
    const [value, setValue] = useState(item);
    const { recipe, mutateRecipe } = useRecipe(recipeId);

    const handleEditClick = () => {
        let isValid = true;

        if (!value) {
            toastError(`Field cannot be blank`);
            isValid = false;
            // value = recipe[section][i];
        }

        if (!isValid) return;
        mutateRecipe(
            produce((draft) => {
                draft[section][i] = value;
            }),
            { optimisticData: recipe, revalidate: false }
        );
        setDraftSaved(false);
        toastSuccess(
            `Draft updated.  To save and add to website click "Save Changes"`
        );
    };

    const handleDeleteClick = () => {
        // console.log(recipe[section]);
        if (recipe[section].length === 1) {
            return toastError(`Must have at least one item in ${section}`);
        }

        mutateRecipe(
            produce((draft) => {
                draft[section].splice(i, 1);
            }),
            { optimisticData: recipe, revalidate: false }
        );
        setDraftSaved(false);
        toastSuccess(
            `Item deleted from draft. To save and add to website click "Save Changes"`
        );
    };
    return (
        <li className="my-4 mx-2">
            <div
                className={`flex ${
                    section === "steps" ? "items-center" : "items-baseline"
                }`}
            >
                {section === "steps" ? (
                    <Textarea
                        className="glassInput"
                        label={`${label} ${i + 1}`}
                        labelPlacement="outside"
                        value={value}
                        onValueChange={setValue}
                        // onChange={console.log(value)}
                    />
                ) : (
                    <Input
                        className="glassInput"
                        label={`${label} ${i + 1}`}
                        labelPlacement="outside"
                        value={value}
                        onValueChange={setValue}
                        // onChange={console.log(value)}
                    />
                )}
                <div className="flex justify-end gap-2">
                    <Button onPress={handleDeleteClick} color="danger">
                        Delete {label}
                    </Button>
                    <Button onPress={handleEditClick} color="secondary">
                        Edit {label}
                    </Button>
                </div>
            </div>
            {i !== length - 1 && <Divider className="my-4" />}
        </li>
    );
}
