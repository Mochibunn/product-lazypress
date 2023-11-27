export default function WhatWeDo() {
    return (
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          backgroundColor: '#333131',
          overflow: 'hidden',
          zIndex: 40,
          height:'50vh'
        }}
      >
        <div
          className="text-white"
          style={{
            backgroundColor: '#333131',
            borderRadius: '20px',
            fontSize: '3rem',
            padding: '20px',
            zIndex: 50,
            opacity: 1,
          }}
        >
          <p
            className="m-10"
            style={{ fontFamily: 'Noyh', textAlign: 'center' }}
          >
            we specialize in crafting tailored websites for various purposes.{' '}
            <br />
            With our{' '}
            <span
              className="italic border-b-2 border-blue-500"
              style={{
                fontFamily: 'Pilated',
                borderRadius: '20px',
                backgroundColor: '#968aea',
              }}
            >
              user-friendly
            </span>{' '}
            <span
              className="italic border-b-2 border-blue-500"
              style={{
                fontFamily: 'Pilated',
                borderRadius: '20px',
                backgroundColor: '#E5D0E3',
              }}
            >
              Content Management System,
            </span>{' '}
            <br />
            you have the tools to manage your site effortlessly, ensuring <br /> a{' '}
            <span
              className="italic border-b-2 border-green-500"
              style={{
                fontFamily: 'Pilated',
                backgroundColor: '#7BE0AD',
                borderRadius: '20px',
              }}
            >
              dynamic
            </span>{' '}
            and personalized online presence. <br />
          </p>
        </div>
      </div>
    );
  }
  