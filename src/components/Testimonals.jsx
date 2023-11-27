import DShapeC from "../assets/images/3DShape2.jpg";




export default function Testimonials  () {
  return (
    <div
    className="w-full h-[150vh] overflow-hidden relative "
    style={{
        backgroundImage: `url(${DShapeC})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        transition: "transform 0.3s ease",
        position: "relative",
    }}
>
    <div
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "150vh",
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            zIndex: 1,
        }}
    ></div>

    <div className="w-[100] h-[100]  flex items-center justify-center py-5 absolute text-center" style={{zIndex:'50',width:'100vw'}}>
      <div className="w-full  px-5 py-16 md:py-24 text-black">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-5 text-black">What people <br />are saying.</h1>
            <h3 className="text-xl mb-5 font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            <div className="text-center mb-10">
              <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
            </div>
          </div>
          <div className="-mx-3 md:flex flex-col justify-center items-center text-center">
            {/* Testimonial 1 */}
            <div className="px-3 md:w-1/3">
              <div className="w-full mx-auto rounded-lg glassCardSmall border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-4 items-center">
                  <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <img src="https://i.pravatar.cc/100?img=1" alt="" />
                  </div>
                  <div className="flex-grow pl-3">
                    <h6 className="font-bold text-sm uppercase text-gray-600">Kenzie Edgar.</h6>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm leading-tight">
                    <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sunt ratione dolor exercitationem minima
                    quas itaque saepe quasi architecto vel! Accusantium, vero sint recusandae cum tempora nemo commodi
                    soluta deleniti.
                    <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="px-3 md:w-1/3">
              <div className="w-full mx-auto rounded-lg glassCardSmall border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-4 items-center">
                  <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <img src="https://i.pravatar.cc/100?img=2" alt="" />
                  </div>
                  <div className="flex-grow pl-3">
                    <h6 className="font-bold text-sm uppercase text-gray-600">Stevie Tifft.</h6>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm leading-tight">
                    <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>
                    Lorem ipsum, dolor sit amet, consectetur adipisicing elit. Dolore quod necessitatibus, labore sapiente,
                    est, dignissimos ullam error ipsam sint quam tempora vel.
                    <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="px-3 md:w-1/3">
              <div className="w-full mx-auto glassCardSmall border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-4 items-center">
                  <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <img src="https://i.pravatar.cc/100?img=3" alt="" />
                  </div>
                  <div className="flex-grow pl-3">
                    <h6 className="font-bold text-sm uppercase text-gray-600">Tommie Ewart.</h6>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm leading-tight">
                    <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, obcaecati ullam excepturi dicta error
                    deleniti sequi.
                    <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
    </div>
  );
};



