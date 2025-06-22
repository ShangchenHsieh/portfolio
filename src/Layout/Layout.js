import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../App.css";

class Layout extends React.Component {
  componentDidMount = () => {

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