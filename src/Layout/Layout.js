import React from "react";
import "../App.css";

class Layout extends React.Component {
  componentDidMount = () => {
    const initAos = () => {
      Promise.all([import("aos"), import("aos/dist/aos.css")]).then(([aosModule]) => {
        const Aos = aosModule.default;

        Aos.init({
          duration: 500,
          easing: "ease-out",
          once: true,
          offset: 40,
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
      <div className="page">
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
