import { useState } from "react";
import { Button, Input, Textarea, Divider } from "@nextui-org/react";
import { useRecipe } from "../../lib/swr";
import { produce } from "immer";

export default function CMSIngInputs({
    item,
    i,
    length,
    label,
    recipeId,
    section,
}) {
    const [form, setForm] = useState({
        amount: item.amount,
        ing: item.ing,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const { recipe, mutateRecipe } = useRecipe(recipeId);

    const handleEditClick = () => {
        mutateRecipe(
            produce((draft) => {
                draft[section][i] = form;
            }),
            { optimisticData: recipe, revalidate: false }
        );
    };

    const handleDeleteClick = () => {
        console.log(recipe[section]);
    };
    return (
        <li className="my-4 mx-2">
            <form className="flex items-baseline">
                <Input
                    className="glassInput"
                    label={`Amount`}
                    labelPlacement="outside"
                    value={form.amount}
                    name="amount"
                    // onValueChange={setValue}
                    onChange={handleChange}
                />
                <Input
                    className="glassInput"
                    label={`Ingredient`}
                    labelPlacement="outside"
                    value={form.ing}
                    name="ing"
                    // onValueChange={setValue}
                    onChange={handleChange}
                />
                <Button onPress={handleDeleteClick} color="danger">
                    Delete {label}
                </Button>
                <Button onPress={handleEditClick} color="success">
                    Edit {label}
                </Button>
            </form>
            {i !== length - 1 && <Divider className="my-4" />}
        </li>
    );
}
