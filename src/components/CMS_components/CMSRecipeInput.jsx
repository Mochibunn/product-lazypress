import { useState } from "react";
import { Button, Input, Textarea, Divider } from "@nextui-org/react";
import { useRecipe } from "../../lib/swr";
import { produce } from "immer";

export default function CMSRecipeInput({
    item,
    i,
    length,
    label,
    recipeId,
    section,
}) {
    const [value, setValue] = useState(item);
    const { recipe, mutateRecipe } = useRecipe(recipeId);

    const handleEditClick = () => {
        mutateRecipe(
            produce((draft) => {
                draft[section][i] = value;
            }),
            { optimisticData: recipe, revalidate: false }
        );
    };

    const handleDeleteClick = () => {
        // console.log(recipe[section]);
        mutateRecipe(
            produce((draft) => {
                draft[section].splice(i, 1);
            }),
            { optimisticData: recipe, revalidate: false }
        );
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
                        onChange={console.log(value)}
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
                <div className="w-full flex justify-end">
                    <Button onPress={handleDeleteClick} color="danger">
                        Delete {label}
                    </Button>
                    <Button onPress={handleEditClick} color="success">
                        Edit {label}
                    </Button>
                </div>
            </div>
            {i !== length - 1 && <Divider className="my-4" />}
        </li>
    );
}
