import { Input, Image, Textarea } from "@nextui-org/react";

export default function CMSInput({ valueObj, i, onChange, sectionIndex }) {
    const { value, label } = valueObj;
    const section = sectionIndex + 1;
    const labelFormat = label.charAt(0).toUpperCase() + label.slice(1); //same as label but it formats the label to include an uppercase first letter

    return (
        <div className="flex mt-2">
            <p className="w-1/12 text-sm font-semibold align-middle ml-2 my-auto">
                {(() => {
                    switch (label) {
                        case "menuItem":
                            return "Menu Item";
                        case "href":
                            return "URL";
                        case "footerItem":
                            return "Footer Item";
                        case "imgUrl":
                            return "Image URL";
                        case "ingList":
                            return "Ingredients List";
                        case "_id":
                            return;
                        default:
                            return labelFormat;
                    }
                })()}
                {/* This is a self invoking function! It's necessary here for the switch statement :) */}
            </p>
            <div className="w-full mr-2">
                {value?.length > 100 ? (
                    <Textarea
                        className={`w-full glassInput ${
                            label === "_id" && "hidden"
                        }`}
                        color="default"
                        value={value}
                        // label={label}
                        name={label}
                        minRows={1}
                        // labelPlacement="outside"
                        // name={`nav${i}`}
                        // onChange={(e) => onChange(e, i)}
                        onChange={(e) => onChange(e, i)}
                        isReadOnly={label === "_id" ? true : false} //For URLs
                        description="Changes won't be reflected on the site until you press `Save Changes` at the bottom of the page."
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
                        size="sm"
                        // labelPlacement="outside-left"
                        // name={`nav${i}`}
                        onChange={(e) => onChange(e, i)}
                        isReadOnly={label === "_id" ? true : false} //For other inputs
                        description="Changes won't be reflected on the site until you press `Save Changes` at the bottom of the page."
                    />
                )}
                <div className="ml-12 mx-auto">
                    {label === "imgUrl" && (
                        <Image
                            alt="Section image"
                            src={value}
                            className="max-h-[200px] max-w-[600px] my-2 shadow-xl"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
