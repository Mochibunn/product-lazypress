import { useState } from "react";
import { Button, Input, Textarea, Divider } from "@nextui-org/react";
import { useRecipe } from "../lib/swr";
import { produce } from "immer";

export default function CMSStepsEdit({
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
        console.log(recipe[section]);
    };
    return (
        <li className="my-4 mx-2">
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
            <Button onPress={handleDeleteClick} color="danger">
                Delete {label}
            </Button>
            <Button onPress={handleEditClick} color="success">
                Edit {label}
            </Button>
            {i !== length - 1 && <Divider className="my-4" />}
        </li>
    );
}
