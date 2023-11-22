import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import Lottie from 'lottie-react';
import Template from '../assets/animations/Template.json';
import Customers from '../assets/animations/Customers.json';
import Market from '../assets/animations/Market.json';
import Sell from '../assets/animations/Sell.json';

export default function OurService() {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      controls.start({ opacity: 1 - scrollPosition / 500 });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <div
      className="relative w-full h-screen flex px-16 py-16 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle, rgba(230,227,250,1) 25%, rgba(174,229,216,1) 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop:'-9vh',
      }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10 text-black flex flex-col gap-2 px-12">
        <motion.div style={{ opacity: controls }} className='flex flex-row justify-around items-center'>
          <Lottie animationData={Template} style={{ width: '250px' }} />
          <div className='flex flex-col justify-center items-center'>
          <h3 className="font-bold text-lg">Create a template</h3>
          <p>
            Choose from any of our industry-leading website templates, designer
            fonts, and color palettes.
          </p>
          </div>
        </motion.div>
        <motion.div  className='flex flex-row justify-around items-center' style={{ opacity: controls }}>
          <Lottie animationData={Market} style={{ width: '200px' }} />
          <div className='flex flex-col justify-center items-center'>
          <h3 className="font-bold text-lg">Sell your products and services</h3>
          <p>
            Set up your template or sell your skills—all on a single platform
            built just for you.
          </p>
          </div>
        </motion.div>
        <motion.div style={{ opacity: controls }} className='flex flex-row justify-around items-center'>
          <Lottie animationData={Sell} style={{ width: '200px' }} />
          <div className='flex flex-col justif-center items-center'>
          <h3 className="font-bold text-lg">Market your business</h3>
          <p>
            On-brand email campaigns and social tools make it easy to retain
            customers and grow your base.
          </p>
          </div> 
        </motion.div>
        <motion.div style={{ opacity: controls }} className='flex flex-row justify-around items-center'>
          <Lottie animationData={Customers} style={{ width: '200px' }} />
          <div className='flex flex-col justify-center items-center'>
          <h3 className="font-bold text-lg">Engage with customers</h3>
          <p>
            Email campaigns that pull in your site’s colors, products, and blog
            posts so your communications feel effortlessly on-brand.
          </p>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
