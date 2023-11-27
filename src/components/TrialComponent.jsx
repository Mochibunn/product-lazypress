import { useRef, useEffect, useState } from 'react';

export default function BlackScreen() {
  const zoomElementRef = useRef(null);
  const [scale, setScale] = useState(0.5); // Initial scale is set to achieve 50vw by 50vh
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 1;

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Calculate the new scale based on the scroll position
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, 0.5 + (scrollY / window.innerHeight) * 0.5));

    // Set the scale and update the CSS
    setScale(newScale);
    zoomElementRef.current.style.transform = `scale(${newScale})`;
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden h-[100vh]">
      <div className="workspace z-50 absolute" ref={zoomElementRef}>
        <h1>Scroll with Wheel or Trackpad</h1>
      </div>
    </div>
  );
}
