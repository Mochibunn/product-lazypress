import { Input, Image, Textarea } from "@nextui-org/react";

export default function CMSInput({ valueObj, i, onChange, sectionIndex }) {
    const { value, label } = valueObj;
    const section = sectionIndex + 1;
    return (
        <div className="flex mt-2">
            <p className="w-1/6 text-sm text-mid align-middle ml-2 my-auto">
                {label === "_id" ? null : label}
            </p>
            <div className="w-4/6 mr-2">
                {value?.length > 100 ? (
                    <Textarea
                        className={`w-full glassInput ${
                            label === "_id" && "hidden"
                        }`}
                        color="default"
                        value={value}
                        // label={label}
                        name={label}
                        // labelPlacement="outside"
                        // name={`nav${i}`}
                        // onChange={(e) => onChange(e, i)}
                        onChange={(e) => onChange(e)}
                        isReadOnly={label === "_id" ? true : false}
                    />
                ) : (
                    <Input
                        className={`w-full glassInput ${
                            label === "_id" && "hidden"
                        }`}
                        color="default"
                        value={value}
                        // label={label}
                        name={label}
                        // labelPlacement="outside-left"
                        // name={`nav${i}`}
                        onChange={(e) => onChange(e, i)}
                        isReadOnly={label === "_id" ? true : false}
                    />
                )}
                <div className="ml-12 mx-auto">
                    {label === "imgUrl" && (
                        <Image
                            alt="No valid image found, try another URL?"
                            src={value}
                            className="max-h-[200px] max-w-[600px] my-2"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
