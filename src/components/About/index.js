import "../../App.css";
import resume from "../../assets/files/Shangchen_Hsieh_Resume.pdf"

export default function About() {
  
  // const getDate = () => {
  //   //changing the age without hard coding it
  //   var dob = new Date("07/02/2001");
  //   var month_diff = Date.now() - dob.getTime();
  //   var age_dt = new Date(month_diff);
  //   var year = age_dt.getUTCFullYear();
  //   var age = Math.abs(year - 1970);
  //   return age;
  // };
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
          >Greetings! I am Sean, a senior computer science student at San Jose State University, specializing in backend development and Artificial Intelligence. I bring a dedicated focus to crafting innovative solutions. Beyond my academic pursuits, I am well-versed in customizing hardware peripherals, such as bespoke PCs and keyboards. Committed to maintaining a healthy work-life balance, I engage in regular workouts to stay active. My keen interest extends into the competitive gaming industry, where I delve into the latest trends and advancements. 
          </p>
          <p
            className="text-justify leading-7 text-slate-900"
            data-aos={"fade-right"}
            style={{ paddingBottom: '80px' }}
          >
            I am actively seeking an internship opportunity in the realm of web development, encompassing responsibilities such as server maintenance, backend development, and workflow automation. With over four years of programming experience, I bring a wealth of knowledge and expertise to contribute. In my previous roles, I successfully utilized Java and React JS to architect intuitive management tools, showcasing my proficiency in creating impactful and efficient solutions. I am eager to apply my skills and dedication to further enhance my capabilities in a professional setting.  
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
  <button class="py-3 mt-5 text-white mx-auto px-9 bg-orange-500 border-2 w-fit border-orange-400 rounded-lg hover:-translate-y-1.5 duration-[350ms] hover:duration-[350ms] hover:bg-orange-600 hover:scale-[1.023] focus:bg-orange-600 bg-opacity-80">
    <a
      target="_blank"
      rel="noreferrer"
      href={resume}
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
