import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../App.css";

class Layout extends React.Component {
  componentDidMount = () => {
    const cursor = document.querySelector(".cursor");
    
    // Enhanced cursor with better performance
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      if (cursor) {
        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";
      }
      
      requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Enhanced hover effects
    const hoverElements = document.querySelectorAll('a, button, [role="button"], .cursor-pointer');
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursor) cursor.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        if (cursor) cursor.classList.remove('hover');
      });
    });

    window.addEventListener("mousedown", () => {
      if (cursor) {
        cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
      }
    });

    window.addEventListener("mouseup", () => {
      if (cursor) {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
      }
    });

    // Start cursor animation
    updateCursor();

    // Initialize AOS with better settings
    const options = { 
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    };
    Aos.init(options);

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="page">
          <div className="flex flex-row overflow-hidden">
            {this.props.children}
          </div>
          <div className="cursor"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;