import { Image } from "@nextui-org/react";
import React, { useState } from "react";
import DScreenC from '../assets/images/3DShape2.jpg';
import Image1 from '../assets/images/Image1.png';
import Image2 from '../assets/images/Image2.jpg';

export default function ExampleProduct() {
  const [isHovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="relative w-full h-[100vh] flex px-16 py-16 overflow-hidden glassCardDark flex flex-col"
        style={{
          backgroundImage: `url(${DScreenC})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginTop: '-9vh',
          overflowY: 'auto',
          backdropFilter: 'blur(100px)',
        }}
      >
        <h1 className="text-4xl font-bold my-4">Our Work</h1>

        <div
          className="water-transition"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={isHovered ? Image2 : Image1}
            className={isHovered ? 'hovered' : ''}
            style={{ width: '40vw', height: '70vh', transition: 'opacity 0.5s ease-in-out' }}
          />
          <p>Blog</p>
        </div>
      </div>
    </>
  );
}
