import React from "react";
import "../App.css";

class Layout extends React.Component {
  componentDidMount = () => {
    const initAos = () => {
      Promise.all([import("aos"), import("aos/dist/aos.css")]).then(([aosModule]) => {
        const Aos = aosModule.default;

        Aos.init({
          duration: 800,
          easing: 'ease-out-cubic',
          once: true,
          offset: 50,
        });
      });
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(initAos, { timeout: 2000 });
    } else {
      window.setTimeout(initAos, 300);
    }
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