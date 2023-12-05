import {
    Card,
    CardHeader,
    // CardBody,
    CardFooter,
    Image,
    Button,
    Tooltip,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

const isMobile = window.matchMedia("(max-width: 600px)");

export default function SiteCard({
    blogId,
    blogTitle,
    previewUrl,
    siteUrl,
    updatedAt,
    deployed,
}) {
    const dateFetch = new Date(Date.parse(updatedAt));
    // console.log(dateFetch == "Invalid Date" ? "Truthy" : "Falsy");
    const date =
        dateFetch == "Invalid Date"
            ? "A long"
            : dateFetch.toLocaleDateString(`default`);
    const time =
        dateFetch == "Invalid Date"
            ? "time ago"
            : dateFetch.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
              });
    // console.log(`🐍\n`, dateFetch);
    // console.log(blogTitle);
    // console.log("is mobile", isMobile.matches);

    return (
        <Card
            // isFooterBlurred
            isHoverable
            className="max-w-full h-[200px] mb-4 mx-2 shadow-xl z-0"
        >
            <CardHeader className="absolute z-20 top-1 flex-col items-start">
                <h4 className="text-white/80 font-normal font-metropolis text-md rounded-xl p-1 px-2 bg-black-3/40 backdrop-blur-md">
                    {blogTitle || "Untitled Page"}
                </h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Site image"
                className="z-10 min-w-full min-h-full object-cover overflow-clip"
                src={previewUrl}
            />
            <div className="flex flex-col transition ease-in-out opacity-70 hover:opacity-100 duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none z-30 min-h-[200px]">
                <CardFooter className="absolute bg-black/80 bottom-0 z-40 border-t-1 border-default-600 dark:border-default-100 ">
                    <div className="flex flex-grow items-center">
                        {/* <Image
						alt="Breathing app icon"
						className="rounded-full w-10 h-11 bg-black"
						src=""
					/> */}
                        <Tooltip
                            content={
                                deployed ? "Page deployed" : "Page not deployed"
                            }
                            color={deployed ? "success" : "secondary"}
                            className="font-metropolis"
                        >
                            <p className="text-xl font-bold mr-2">
                                {deployed ? "🟢" : "🟣"}
                            </p>
                        </Tooltip>
                        <div className="flex flex-col">
                            <p className="text-white/75 font-semibold text-sm font-metropolis">
                                Last edited:
                            </p>
                            <p className="text-white/60 text-xs font-metropolis">
                                {date}
                            </p>
                            <p className="text-white/60 text-xs font-metropolis">
                                {time}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <a href={siteUrl} target="_blank" rel="noreferrer">
                            <Button radius="full" size="sm" color="primary">
                                Go to Site
                            </Button>
                        </a>
                        <Link
                            to={
                                isMobile.matches
                                    ? `/mobile/${blogId}`
                                    : `/cms/${blogId}`
                            }
                            target={!isMobile.matches ? "_blank" : "_self"}
                        >
                            <Button radius="full" size="sm" color="secondary">
                                Edit Site
                            </Button>
                        </Link>
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
}
