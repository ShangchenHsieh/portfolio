import pmtPic from "../assets/images/cats.jpg"
import libPic from "../assets/images/libraay system.png"
export const projects = [
  {
    title: "Pet Management System",
    desc: "This robust full-stack application efficiently manages and monitors animal well-being. Integrating Spring Boot and React.js, it offers a user-friendly interface for streamlined animal care, tracking, and health status management.",
    tags: [
      {
        name: "Springboot",
        color: "green-400",
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
  {
    title: "Project Management Tool",
    desc: "",
    tags: [
      {
        name: "Springboot",
        color: "green-400",
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
    img: "",
    link: "",
    code: "",
  },
  {
    title: "Library Management System",
    desc: "CS151 Library Management System digitizes the local library, offering a user-friendly interface, CRUD operations, and persistent data using JSON files.",
    tags: [
      {
        name: "Java",
        color: "red-400",
      }, 
      {
        name: "Java Swing", 
        color: "blue-700"
      }
    ],
    img: libPic,
    link: "https://github.com/ShangchenHsieh/CS151_Library_Management_System",
    code: "https://github.com/ShangchenHsieh/CS151_Library_Management_System",
  }
];
