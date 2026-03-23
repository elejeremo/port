import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollApp = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const mask = maskRef.current;
    
    if (!container || !wrapper || !mask) return;

    const sections = gsap.utils.toArray(container.querySelectorAll('section'));
    const texts = gsap.utils.toArray(container.querySelectorAll('.anim'));

    // Main horizontal scroll animation
    let scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: "+=3000",
        markers: false,
      }
    });

    // Progress bar animation
    gsap.to(mask, {
      width: "100%",
      scrollTrigger: {
        trigger: wrapper,
        start: "top left",
        scrub: 1
      }
    });

    // Animate text elements in each section
    sections.forEach((section) => {
      let text = section.querySelectorAll(".anim");
      
      if (text.length === 0) return;
      
      gsap.from(text, {
        y: -130,
        opacity: 0,
        duration: 2,
        ease: "elastic",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          containerAnimation: scrollTween,
          start: "left center",
          markers: false
        }
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&family=Poppins:wght@200;400;700&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }
        
        .wrapper {
          overflow-x: hidden;
          position: relative;
        }
        
        .progress-svg {
          position: absolute;
          top: 12rem;
          left: 10vw;
          width: 50vw;
          z-index: 10;
        }
        
        .progress-mask {
          width: 0;
        }
        
        .container {
          display: flex;
          width: 300vw;
        }
        
        .section {
          width: 100vw;
          padding: 20vw 10vw;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .section h1 {
          font-size: 3rem;
          margin: 0;
          font-family: 'Playfair Display', serif;
          color: #2d3748;
        }
        
        .section span {
          font-size: 0.9rem;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }
        
        .col {
          display: flex;
          gap: 3rem;
          margin-top: 2rem;
        }
        
        .col p {
          font-size: 1rem;
          width: 50vw;
          line-height: 1.6;
          color: #4a5568;
        }
        
        .sec1 {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .sec1 h1,
        .sec1 span,
        .sec1 p {
          color: white;
        }
        
        .sec2 {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        }
        
        .sec2 h1,
        .sec2 span,
        .sec2 p {
          color: white;
        }
        
        .sec3 {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        }
        
        .sec3 h1,
        .sec3 span,
        .sec3 p {
          color: white;
        }
        
        .end-section {
          background-color: #e6f3ff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: #2d3748;
        }
      `}</style>
      
      <div className="wrapper" ref={wrapperRef}>
        <div className="container" ref={containerRef}>
          {/* Progress Bar SVG */}
          <svg 
            className="progress-svg"
            viewBox="0 0 900 10" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M9.89998 6C9.43671 8.28224 7.41896 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.41896 0 9.43671 1.71776 9.89998 4H445.1C445.563 1.71776 447.581 0 450 0C452.419 0 454.437 1.71776 454.9 4H890.1C890.563 1.71776 892.581 0 895 0C897.761 0 900 2.23858 900 5C900 7.76142 897.761 10 895 10C892.581 10 890.563 8.28224 890.1 6H454.9C454.437 8.28224 452.419 10 450 10C447.581 10 445.563 8.28224 445.1 6H9.89998Z" 
              fill="#D9D9D9"
            />
            <mask id="mask0_0_1" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="900" height="10">
              <path 
                d="M9.89998 6C9.43671 8.28224 7.41896 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.41896 0 9.43671 1.71776 9.89998 4H445.1C445.563 1.71776 447.581 0 450 0C452.419 0 454.437 1.71776 454.9 4H890.1C890.563 1.71776 892.581 0 895 0C897.761 0 900 2.23858 900 5C900 7.76142 897.761 10 895 10C892.581 10 890.563 8.28224 890.1 6H454.9C454.437 8.28224 452.419 10 450 10C447.581 10 445.563 8.28224 445.1 6H9.89998Z" 
                fill="#D9D9D9"
              />
            </mask>
            <g mask="url(#mask0_0_1)">
              <rect 
                className="progress-mask" 
                ref={maskRef}
                y="-49" 
                height="99" 
                fill="rgba(255, 255, 255, 0.8)"
              />
            </g>
          </svg>

          {/* Section 1 */}
          <section className="section sec1 pin">
            <span>Advanced</span>
            <h1>Signify Elegance</h1>
            <div className="col">
              <p>Experience the future of digital design with our revolutionary approach to user interface development. Our cutting-edge solutions combine aesthetic brilliance with functional excellence.</p>
              <p>Transform your digital presence with interfaces that not only look stunning but perform flawlessly across all devices and platforms. Innovation meets elegance in every pixel.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="section sec2 pin">
            <span className="anim">Innovative</span>
            <h1 className="anim">Creative Solutions</h1>
            <div className="col anim">
              <p>Harness the power of modern technology to create experiences that captivate and engage your audience. Our team specializes in crafting digital solutions that push boundaries.</p>
              <p>From concept to execution, we deliver results that exceed expectations. Every project is an opportunity to redefine what's possible in the digital landscape.</p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="section sec3 pin">
            <span className="anim">Premium</span>
            <h1 className="anim">Exceptional Quality</h1>
            <div className="col anim">
              <p>Quality is not just a goal—it's our foundation. We meticulously craft every element to ensure your digital presence stands out in today's competitive market.</p>
              <p>Partner with us to unlock the full potential of your brand through exceptional design and seamless user experiences that drive real results.</p>
            </div>
          </section>
        </div>
      </div>

      {/* End section */}
      <section className="end-section">
        <div>
          <h2>Ready to Begin?</h2>
          <p>Let's create something extraordinary together.</p>
        </div>
      </section>
    </div>
  );
};

export default HorizontalScrollApp;