import {
  Card,
  CardHeader,
  // CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SiteCard({
  blogId,
  blogTitle,
  previewUrl,
  siteUrl,
  updatedAt,
}) {
  const [hovering, setHovering] = useState(false);
  const handleMouseOver = () => {
    setHovering(true);
  };
  const handleMouseOut = () => {
    setHovering(false);
  };

  const dateFetch = new Date(Date.parse(updatedAt));
  const date = dateFetch.toLocaleDateString(`default`);
  const time = dateFetch.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(`🐍\n`, dateFetch);
  const lastUpdate = `${updatedAt}` || `Some time ago`;

  console.log(blogTitle);

  return (
    <Card
      isFooterBlurred
      isHoverable
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="max-w-full h-[200px] mb-4 mx-2 shadow-xl"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <h4 className="text-black/90 font-medium text-xl">{blogTitle}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Site image"
        className="z-0 w-full h-full object-cover"
        src={previewUrl}
      />
      {hovering && (
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            {/* <Image
						alt="Breathing app icon"
						className="rounded-full w-10 h-11 bg-black"
						src=""
					/> */}
            <div className="flex flex-col">
              <p className="text-white/75 font-semibold text-sm">Last edited</p>
              <p className="text-white/60 text-xs">{date}</p>
              <p className="text-white/60 text-xs">{time}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href={siteUrl} target="_blank" rel="noreferrer">
              <Button radius="full" size="sm">
                Go to Site
              </Button>
            </a>
            <Link to={`/cms/${blogId}`} target="_blank">
              <Button radius="full" size="sm">
                Edit Site
              </Button>
            </Link>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
