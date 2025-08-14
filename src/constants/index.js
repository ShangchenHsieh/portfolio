import pmtPic from "../assets/images/cats.jpg"
import nexGen from "../assets/images/nexgen.png"
import pmp from "../assets/images/pmp_pic.png"
import germany from "../assets/images/germany.png"
import nimbus from "../assets/images/nimbus.png"
import awsCert from "../assets/files/aws_cloud.pdf"
import udemyCert from "../assets/files/udemy_certificate.pdf"
import nvidiaDeepLearning from "../assets/files/NVIDIA_Getting_Started_with_Deep_Learning.pdf"
import nvidiaAICourse from "../assets/files/NVIDIA AI for All From Basics to GenAI Practice_AI for All From Basics to GenAI Practice - Course Completion Certificate.pdf"
import cloud_pract from "../assets/images/aws_cloud_practitioner.png"
import nvidia from "../assets/images/nvidia_logo.png"
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
    link: "https://https://nexgen-ai-cover-letter-generator-195913554814.us-central1.run.app/",
    code: "https://https://nexgen-ai-cover-letter-generator-195913554814.us-central1.run.app/",
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
];

export const certificates = [
  {
    title: "Getting Started with Deep Learning",
    issuer: "NVIDIA",
    date: "2025",
    tags: [
      { name: "Deep Learning", color: "green-400" },
      { name: "AI/ML", color: "purple-400" },
      { name: "Neural Networks", color: "blue-400" },
    ],
    img: nvidia,
    downloadLink: nvidiaDeepLearning,
    viewLink: null,
  },
  {
    title: "AI for All: From Basics to GenAI Practice",
    issuer: "NVIDIA",
    date: "2025",
    tags: [
      { name: "Artificial Intelligence", color: "purple-400" },
      { name: "Generative AI", color: "green-400" },
      { name: "Machine Learning", color: "blue-400" },
    ],
    img: nvidia,
    downloadLink: nvidiaAICourse,
    viewLink: null,
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    tags: [
      { name: "AWS", color: "orange-400" },
      { name: "Cloud Computing", color: "blue-400" },
      { name: "Infrastructure", color: "green-400" },
    ],
    img: cloud_pract, // Placeholder image
    downloadLink: awsCert,
    viewLink: null,
  }
];
