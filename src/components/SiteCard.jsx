import {
	Card,
	CardHeader,
	// CardBody,
	CardFooter,
	Image,
	Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function SiteCard({ blogId, blogTitle, previewUrl, siteUrl }) {

	console.log(blogTitle);
	return (
		<Card
			isFooterBlurred
			isHoverable
			className="max-w-full h-[200px] mb-4 mx-2"
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
			<CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
				<div className="flex flex-grow gap-2 items-center">
					{/* <Image
						alt="Breathing app icon"
						className="rounded-full w-10 h-11 bg-black"
						src=""
					/> */}
					<div className="flex flex-col">
						<p className="text-white/75 font-semibold">Last edited:</p>
						<p className="text-white/60 text-sm">11/21/2023 9:34 PM</p>
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
		</Card>
	);
}
