import DShapeA from "../assets/images/3DShape1.jpg";

export default function ThankyouPage() {
  return (
    <div
      className="w-full h-[100vh] overflow-hidden"
      style={{
        backgroundImage: `url(${DShapeA})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        transition: "transform 0.3s ease",
        position: "relative",
      }}
    >
      <div className="">
        <h2
          className="text-4xl font-extrabold tracking-wide neon-text pt-32"
          style={{
            textAlign: "center",
            fontFamily: "Lemon Milk",
            fontSize: "6rem",
          }}
        >
          Thank you
        </h2>
        <p
          className="font-bold text-slate-200 text-3xl neonText mt-32"
          style={{
            textAlign: "center",
            fontFamily: "Mom Cake",
            color: "black",
          }}
        >
          Your contact form has been submitted. We will get back in touch with
          <br />
          you soon! Have a great day, and let us know if there’s anything
          <br />
          else we can help you with.
        </p>
      </div>
    </div>
  );
}
