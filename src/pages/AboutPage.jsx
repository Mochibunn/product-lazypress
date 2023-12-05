import Thankyou from "../assets/images/RecipeImage.jpg";

export default function AboutPage() {
    return (
        <div
            className="h-[100vh]"
            style={{
                backgroundColor:'white',
                height: "100vh",
                marginTop: "-4rem",
                zIndex: 40,
                position: "relative",
            }}
        >
            <div className="flex justify-center">
                <img src={Thankyou} className="border-2 border-black h-[100vh] w-[80vw]" style={{objectFit:'cover'}}/>
            </div>
        </div>
    );
}
