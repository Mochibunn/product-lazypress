import { useState } from "react";
import { Button, Input, Divider, Tooltip } from "@nextui-org/react";
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
        mutateRecipe(
            produce((draft) => {
                draft[section].splice(i, 1);
            }),
            { optimisticData: recipe, revalidate: false }
        );
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
                    description="Changes won't be reflected on the site until you press `Save Changes` at the bottom of the page."
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
                <Tooltip
                    placement="below"
                    content="Will not be deleted permanently until you click `Save Changes`"
                >
                    <Button onPress={handleDeleteClick} color="danger">
                        Delete {label}
                    </Button>
                </Tooltip>
                <Button onPress={handleEditClick} color="success">
                    Edit {label}
                </Button>
            </form>
            {i !== length - 1 && <Divider className="my-4" />}
        </li>
    );
}
