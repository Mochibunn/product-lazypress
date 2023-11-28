import { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
// import CMSStepTextarea from "./CMSStepTextArea";

export default function CMSStepsEdit({ step, i }) {
    return (
        <li className="my-4 mx-2">
            {/* <div>{step}</div> */}
            <Input value={step} />
            <Button>Edit Step</Button>
            <Button>Delete Step</Button>
        </li>
    );
}
