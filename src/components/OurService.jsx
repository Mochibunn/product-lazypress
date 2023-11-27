//import DShapeC from "../assets/images/3DShape3.jpg";



export default function OurService() {
 

  return (
    <div className="relative w-full flex" style={{height:'30vh'}}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "250vh",
          backdropFilter: "blur(4px)",
          backgroundColor: '#333131',
          zIndex: 1,
        }}
      ></div>
       <div class="wrapper z-50">
  <div class="marquee">
      <h1
        style={{
          fontFamily: "Pilated",
          fontWeight: 'bold',
          fontSize: "18rem",
          zIndex: 900,
          marginTop: "0",
          marginLeft: 0,
          transition: "margin 0.5s ease",
          lineHeight: "0.8",
        }}
      >
      
        <div class="text text-1">Wh</div>
          <div class="text text-2">at &nbsp;</div>
          <div class="text text-3">We &nbsp;</div>
          <div class="text text-4">Do</div>
          <div class="text text-2">* &nbsp;</div>
          <div class="text text-1">Wh</div>
          <div class="text text-2">at &nbsp;</div>
          <div class="text text-3">We &nbsp;</div>
          <div class="text text-4">Do</div>
          <div class="text text-2">*</div>
          <div class="text text-1">Wh</div>
          <div class="text text-2">at &nbsp;</div>
          <div class="text text-3">We &nbsp;</div>
          <div class="text text-4">Do</div>
          <div class="text text-2">*</div>

      </h1>
      </div>
      </div>
    </div>
  );
}
