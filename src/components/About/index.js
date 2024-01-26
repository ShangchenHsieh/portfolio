import "../../App.css";
import DownloadIcon from "@mui/icons-material/Download";
// import LearningCode from "../../assets/images/learn-coding-clipart.svg";
import * as LottiePlayer from "@lottiefiles/lottie-player";

export default function About() {
  
  const getDate = () => {
    //changing the age without hard coding it
    var dob = new Date("07/02/2001");
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    return age;
  };
  return (
    <div
      id="about"
      className="min-h-screen bg-white flex flex-col text-center gap-5 text-black text-lg  font-normal"
    >
      <div className="head text-5xl mt-12 font-bold" data-aos={"slide-down"}>
        About Me
      </div>
      <div className="flex flex-row  gap-6 ml-8">
        <div className="flex-col mt-14 flex flex-auto w-64 gap-6">
          <h3 className="text-3xl font-medium" data-aos={"fade-right"}>
            I'm <span className="text-yellow-600">Shang-chen Hsieh,</span> a full-stack developer
          </h3>
          <p
            className="pt-5 leading-7 text-slate-900 text-justify"
            data-aos={"fade-right"}
          >
            Hello! My name is Shangchen Hsieh and I am {getDate()}-years-old computer science senior student at San Jose State University passionate in backend development and Artifical Intelligence. 
            Aligning with my profession, I also customize setup peripheral, like custom PC and custom keyboard. Outside of my profession, I enjoy working out  to stay active and dive deep into the competitive gaming industries.  
          </p>
          <p
            className="text-justify leading-7 text-slate-900"
            data-aos={"fade-right"}
            style={{ paddingBottom: '80px' }}
          >
            I am currently looking for an internship that are web-development related, including server maintance, backend, automated workflow, etc. I have over 4 years exprience in programming, and in my 
            past experience, I have been working with Java and React JS to creat intuitive management tools.  
          </p>
        </div>

        <div class="relative">
  <div class="motion-safe:animate-zoomy" >
    <lottie-player
      autoplay
      loop
      mode="bounce"
      src="https://lottie.host/9985a1ad-3072-4467-bfcb-4241fce1ed61/Mqeqwz3iAy.json"
      style={{ width: "350px" }}
      data-aos={"fade-left"}
    />
  </div>
  <div class="flex justify-center" data-aos={"fade-left"}>
    <button class="py-3 mt-5 text-white mx-auto px-9 bg-blue-600 border-2 w-fit border-blue-500 rounded-3xl hover:-translate-y-1.5 duration-[350ms] hover:duration-[350ms] hover:bg-blue-800 hover:scale-[1.023] focus:bg-blue-800 animate-zoomy">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://drive.google.com/file/d/128uH4p-CKnE4xaSf7PemkZkysK01vmZJ/view?usp=sharing"
      >
        View My Resume
      </a>
    </button>
  </div>
</div>

      </div>
    </div>
  );
}
