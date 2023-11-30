import { useState } from "react";
import { Button, Input, Textarea, Divider } from "@nextui-org/react";
import { toastError, toastSuccess } from "../../lib/toastify";

export default function CMSAddRecipeInput({
    item,
    i,
    length,
    label,
    section,
    setNewRecipe,
    newRecipe,
}) {
    const [value, setValue] = useState(item);

    const handleEditClick = () => {
        let isValid = true;

        if (!value) {
            toastError(`Field cannot be blank`);
            isValid = false;
            // value = recipe[section][i];
        }

        if (!isValid) return;
        setNewRecipe((draft) => {
            draft[section][i] = value;
        });
        toastSuccess(`Draft updated`);
    };

    const handleDeleteClick = () => {
        if (newRecipe[section].length === 1) {
            return toastError(`Must have at least one item in ${section}`);
        }
        setNewRecipe((draft) => {
            draft[section].splice(i, 1);
        });
        // toastSuccess(
        //     `Item deleted from draft`
        // );
    };
    return (
        <li className="my-4 mx-2">
            <div
                className={`flex items-baseline ${
                    item.length > 100 && "flex-col"
                }`}
            >
                {item.length > 100 ? (
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
                <div className="w-full flex justify-end gap-2">
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
