import { Textarea } from "@nextui-org/react";

export default function CMSStepTextarea() {
    return (
        <div>
            <Textarea
                className={`w-full glassInput`}
                color="default"
                // value={value}
                // label={label}
                // name={label}
                minRows={1}
                // labelPlacement="outside"
                // name={`nav${i}`}
                // onChange={(e) => onChange(e, i)}
                // onChange={(e) => onChange(e, i)}
            />
        </div>
    );
}
