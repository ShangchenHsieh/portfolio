import pmtPic from "../assets/images/cats.jpg"
import nexGen from "../assets/images/nexgen.png"
import pmp from "../assets/images/pmp_pic.png"
import germany from "../assets/images/germany.png"
import nimbus from "../assets/images/nimbus.png"
export const projects = [
  {
    title: "Preview My Professor - San Jose State University",
    desc: "PMP is a powerful course lookup tool that reduces search time from 5 minutes to just a few seconds..",
    tags: [
      { name: "AWS Aurora RDS", color: "blue-300" },
      { name: "PostgreSQL", color: "blue-300" },
      { name: "GCP", color: "white-300" },
      { name: "CI/CD with GCP", color: "white-300" },
      { name: "Flask", color: "blue-600" },


    ],
    img: pmp,
    link: "https://www.previewmyprofessor.com/",
    code: "https://github.com/ShangchenHsieh/preview-my-professor",
  },
  {
    title: "NexGen AI",
    desc: "NextGen AI is a AI powered cover letter generator that automate the process of generation, formatting, and download.",
    tags: [
      {
        name: "Python",
        color: "blue-400",
      },
      {
        name: "openAI",
        color: "green-400",
      },
    ],
    img: nexGen,
    link: "https://nexgen-cover-letter-generator-986061347733.us-central1.run.app",
    code: "https://nexgen-cover-letter-generator-986061347733.us-central1.run.app",
  },
  {
    title: "Nimbus Cloud Banking",
    desc: "Germany City+ is a travel planning Dash app for exploring Germany, providing personalized recommendations using KMeans-clustering model and AI algorithms.",
    tags: [
      {
        name: "Django",
        color: "blue-300",
      },
      {
        name: "AWS RDS",
        color: "pink-400",
      },
      {
        name: "Vite",
        color: "orange-300"
      }
    ],
    img: nimbus,
    link: "https://youtu.be/sortpnx6NxI", // to be upload
    code: "https://github.com/ShangchenHsieh/nimbus-cloud-banking",
  },
  {
    title: "Germany City+",
    desc: "Germany City+ is a travel planning Dash app for exploring Germany, providing personalized recommendations using KMeans-clustering model and AI algorithms.",
    tags: [
      {
        name: "Dash",
        color: "blue-300",
      },
      {
        name: "Plotly",
        color: "pink-400",
      },
      {
        name: "Sci-kit Learn",
        color: "orange-300"
      }
    ],
    img: germany,
    link: "", // to be upload
    code: "https://github.com/ShangchenHsieh/Germany-City-Plus",
  },
  {
    title: "Pawfect+",
    desc: "This robust full-stack application efficiently manages and monitors animal well-being. Integrating Spring Boot and React.js, it offers a user-friendly interface for streamlined animal care, tracking, and health status management.",
    tags: [
      {
        name: "FastAPI",
        color: "blue-250",
      },
      {
        name: "React JS",
        color: "blue-400",
      },
      {
        name: "PostgreSQL",
        color: "blue-300"
      }
    ],
    img: pmtPic,
    link: "", // to be upload
    code: "https://github.com/ShangchenHsieh/pet-management-tool",
  },
];
