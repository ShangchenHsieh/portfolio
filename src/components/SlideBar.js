import "../App.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useState } from "react";
import "../componentStyling/SlideBar.css"
import { Button } from "@mui/material";
import coffee from "../assets/images/buy_me_a_coffee.jpg"

export default function Slidebar() {
  const [select, setSelect] = useState(0);
  return (
    <div className="slidebar-container">
      <div className="nav flex  text-white text-lg mt-10 flex-col align-middle justify-center text-center w-full gap-5 overflow-hidden">
        <div data-aos="slide-down">
          <img
            src={require("../assets/images/MyImage.webp")}
            alt="Shangchen Hsieh"
            className="rounded-full border-solid cursor-pointer  border-[3px] border-stone-600 min-h-fit mx-auto  max-w-[190px]"
          />
          <h3 className="text-white name py-4 font-medium ">
            Shang-chen<br />Hsieh
          </h3>
        </div>
        <p
          onClick={() => setSelect(0)}
          className={`cursor-pointer hover:text-blue-600 hover:-translate-y-0.5 hover:text-xl transition hover:transition ${select === 0 ? "text-blue-600 " : ""
            }`}
          data-aos="slide-right"
          data-aos-delay="200"
        >
          <a href="/#">Home</a>
        </p>
        <p
          onClick={() => setSelect(1)}
          className={`cursor-pointer hover:text-blue-600 hover:-translate-y-0.5 hover:text-xl transition hover:transition ${select === 1 ? "text-blue-600 " : ""
            }`}
          data-aos-delay="600"
          data-aos="slide-left"
        >
          <a href="#about"> About Me</a>
        </p>
        <p
          onClick={() => setSelect(2)}
          className={`cursor-pointer hover:text-blue-600 hover:-translate-y-0.5 hover:text-xl transition hover:transition ${select === 2 ? "text-blue-600 " : ""
            }`}
          data-aos="slide-right"
          data-aos-delay="1000"
        >
          <a href="#resume">Resume</a>
        </p>
        <p
          onClick={() => setSelect(3)}
          className={`cursor-pointer hover:text-blue-600 hover:-translate-y-0.5 hover:text-xl transition hover:transition ${select === 3 ? "text-blue-600 " : ""
            }`}
          data-aos="slide-left"
          data-aos-delay="1400"
        >
          <a href="#projects">My Projects</a>
        </p>
        <p
          onClick={() => setSelect(4)}
          className={`cursor-pointer hover:text-blue-600 hover:-translate-y-0.5 hover:text-xl transition hover:transition ${select === 4 ? "text-blue-600 " : ""
            }`}
          data-aos="slide-right"
          data-aos-delay="1800"
        >
          <a href="#contact">Contact</a>
        </p>
      </div>
      <div
        className="text-white flex flex-row gap-5 w-fit mx-auto pt-7"
        data-aos="slide-up"
        data-aos-delay="2300"
      >
        <div
          onClick={() =>
            window.open("https://github.com/ShangchenHsieh", "_blank")
          }
        >
          <GitHubIcon className="cursor-pointer hover:scale-105" />
        </div>

        <div
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/shang-chen-hsieh-598167222/",
              "_blank"
            )
          }
        >
          {" "}
          <LinkedInIcon className="cursor-pointer hover:scale-105" />
        </div>
        <div
          onClick={() =>
            window.open("https://www.instagram.com/seanch.h___/", "_blank")
          }
        >
          {" "}
          <InstagramIcon className="cursor-pointer hover:scale-105" />
        </div>
      </div>

      <div className="text-white flex flex-row gap-5 w-fit mx-auto pt-7"
        data-aos="slide-up"
        data-aos-delay="2300">

        <div
          onClick={() =>
            window.open("https://www.paypal.com/paypalme/buyseanacoffee", "_blank")
          }
        >
          <Button>
            <img src={coffee} alt="Buy Me a Coffee" className="cursor-pointer hover:scale-105" style={{ width: "150px" }} />
          </Button>
        </div>

      </div>



    </div>
  );
}
