import DShapeA from "../assets/images/3DShape1.jpg";

export default function ThankyouPage() {
  return (
    <div
      className="overflow-x-hidden flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${DShapeA})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        transition: "transform 0.3s ease",
        marginTop:'-4rem',
        height:'100vh'
        
      }}
    >
      <div className="text-center">
        <h2
          className="text-4xl font-extrabold tracking-wide neon-text "
          style={{
            textAlign: "center",
            fontFamily: "Lemon Milk",
            fontSize: "6rem",
          }}
        >
          Thank you
        </h2>
        <p
          className="font-bold text-slate-200 text-3xl neonText mt-20"
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
