import { useState } from "react";
import { Button } from "@nextui-org/react";
import CMSStepTextarea from "./CMSStepTextArea";

export default function CMSStepsEdit({ step }) {
    const [editing, setEditing] = useState(false);
    const toggleEditing = () => {
        setEditing((prev) => !prev);
    };
    return (
        <li className="my-4 mx-2">
            <div>{step}</div>
            <Button onClick={toggleEditing}>Edit Step</Button>
            <Button>Delete Step</Button>
        </li>
    );
}
