import { Button } from "@nextui-org/react";
// import { getSites } from "../lib/dbClient";

export default function HeroBanner() {
  // console.log(getSites);
  return (
    <>
      <div
        className="w-[100%] h-[90vh] overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1526992430293-51554a151122?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold">Text Here</h1>
          <p className="text-lg"> additional information</p>
          <Button color="primary">Get Started</Button>
        </div>
      </div>
      {/* <div className="max-h-50vh overflow-hidden">
        <Image
          removeWrapper
          alt="carousel banner"
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          draggable="false"
          className="w-[100%] h-[50vh] object-cover"
          style={{}}
        />
      </div> */}
    </>
  );
}
