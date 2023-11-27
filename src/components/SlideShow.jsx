


const SlideShow = () => {
  return (
    <>
      <div className="header" id="top">
        <h1>Scroll Down</h1>
        <i className="fa fa-angle-down animated bounce"></i>
      </div>

      <div className="section animate">
        <div className="middle">
          <img src="https://images.unsplash.com/photo-1460400408855-36abd76648b9?dpr=2&auto=format&crop=entropy&fit=crop&w=250&h=250&q=80" alt="Nature" />
        </div>
        <div className="left title">
          <div className="content">
            <h2>A glorious nature shot.</h2>
            <p>Wow. What a wonderful image. And look! there are even more images on the right side. Amazing. If you click below, I bet you'll get teleported to a magical land.</p>
            <a href="#" className="btn-primary">Learn more</a>
          </div>
        </div>
        <div className="right tiles">
          <img src="https://images.unsplash.com/photo-1460400408855-36abd76648b9?dpr=2&auto=format&crop=entropy&fit=crop&w=250&h=250&q=80" alt="Nature" />
          {/* Add more images as needed */}
        </div>
      </div>

      {/* Add more sections as needed */}

      <div className="footer">
        <a href="#top" className="scrollTo"><i className="fa fa-angle-up animated bounce"></i></a>
        <h1>Scroll Up</h1>
      </div>
    </>
  );
};

export default SlideShow;
