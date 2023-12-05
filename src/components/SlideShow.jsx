//import OurWork from '../assets/images/OurWork.jpg';
//import DShapeA from '../assets/images/3DShape1.jpg';



const SlideShow = () => {
  return (
    <div className="landing-section relative flex flex-wrap"
    style={{height:'300vh'}}>
      <article className="gallery-article">
        <figure className="gallery-figure w-full  items-center flex justify-center text-left gap-20"
         style={{ fontSize:'3rem', fontFamily:'Pilated',backgroundColor:'#333131', color:'#fffff1'}}>
          <div className="flex flex-col  ">
          <p>*blog</p>
          <p>*ecommerce</p>
          <p>*forum</p>
          </div>
       <div>
       <img src='https://cdn.dribbble.com/userupload/11377897/file/original-e64cec7f0f9cb1b68ff4043c385da302.png?resize=1024x768' alt="" style={{width:'100vw',marginLeft:'15vw'}}/>
       </div>
         
        </figure>
        <section className="gallery-section "
        style={{backgroundColor:'#333131'}}>
          <div className="gallery-content  text-center flex items-center">
          <div className="py-12 flex flex-col items-center justify-center h-full ">
        {/* Testimonials Section*/}

        <div  
>
    

    <div>
      <div className="w-full  px-5 py-16 md:py-24 text-black">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-4xl md:text-5xl  mb-5 text-[#fffff1]"style={{fontFamily:'Pilated'}}>What people <br />are saying</h1>
            <div className="text-center mb-10">
              <span className="inline-block w-1 h-1 rounded-full bg-[#fffff1] ml-1"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-[#fffff1] ml-1"></span>
              <span className="inline-block w-40 h-1 rounded-full bg-[#fffff1]"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-[#fffff1]ml-1"></span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#fffff1] ml-1"></span>
            </div>
          </div>
          <div className="-mx-3 md:flex flex-row justify-center items-center text-center">
            {/* Testimonial 1 */}
            <div className="px-3 md:w-1/3">
              <div className="w-full mx-auto rounded-lg glassCardSmall border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-4 items-center">
                  <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <img src="https://i.pravatar.cc/100?img=1" alt="" />
                  </div>
                  <div className="flex-grow pl-3">
                    <h6 className="font-bold text-sm uppercase text-[#fffff1]">Someone</h6>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm text-[#fffff1] leading-tight">
                    <span className="text-lg leading-none italic font-bold text-[#fffff1] mr-1">"</span>
                   They are so cool.    They are so cool.    They are so cool.    They are so cool.    They are so cool.    They are so cool.
                    <span className="text-lg leading-none italic font-bold text-[#fffff1] ml-1">"</span>
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
                    <h6 className="font-bold text-sm uppercase text-[#fffff1]">Lady Gaga</h6>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm leading-tight text-[#fffff1]">
                    <span className="text-lg leading-none italic font-bold text-[#fffff1]mr-1">"</span>
                    They are so cool.    They are so cool.    They are so cool.    They are so cool.    They are so cool.    They are so cool.
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
                    <h6 className="font-bold text-sm uppercase text-[#fffff1]">Nicki Minaj</h6>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm leading-tight text-[#fffff1]">
                    <span className="text-lg leading-none italic font-bold text-[#fffff1]mr-1">"</span>
                    They are so cool.    They are so cool.    They are so cool.    They are so cool.    They are so cool.    They are so cool.
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
      </div>
          </div>
        </section>
      </article>
    </div>
  );
};

export default SlideShow;
