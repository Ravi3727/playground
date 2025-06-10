import lakshayImg from "../membersPic/lakshay.jpg";
import nikunjImg from "../membersPic/nikunj2.png";
import yashImg from "../membersPic/yash.png";
import arihantImg from "../membersPic/arihant.jpg";
import visheshImg from "../membersPic/sharmaji.jpg";
import presidentImg from "../membersPic/president.jpg";
import ayushmanImg from "../membersPic/ayushmannnn.jpg";
import sahilImg from "../membersPic/sahil.jpg";
import somyaImg from "../membersPic/somya.jpg";
import raviImg from "../membersPic/ravi.jpg";
import sonalImg from "../membersPic/sonal_new.jpg";

export const technologies = [
    {
      name: "Web Development",
      description: "Learn modern web technologies and frameworks",
    },
    {
      name: "App Development",
      description: "Build mobile applications for Android and iOS",
    },
    {
      name: "Machine Learning",
      description: "Explore AI and ML with Google's tools and technologies",
    },
    {
      name: "Cybersecurity",
      description: "Learn about security best practices and ethical hacking",
    },
    {
      name: "UI/UX",
      description: "Design intuitive user experiences and interfaces",
    },
    {
      name: "Open Source",
      description: "Contribute to open-source projects and collaborate with developers",
    },
    {
      name: "DSA/CP",
      description: "Enhance problem-solving skills with data structures and algorithms",
    },
    
    {
      name: "Social Media",
      description: "Leverage social media to build community engagement",
    }
  ];


export const sampleProjects = [
  {
    id: 1,
    title: "GDG Community Platform",
    description: "A comprehensive platform for managing GDG community events, projects, and resources with real-time updates and interactive dashboards.",
    date: "April 2023",
    category: "Web Dev",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    github: "https://github.com/gdg-community/platform",
    demo: "https://gdg-platform.dev",
    tags: ["React", "Firebase", "Material UI"]
  },
  {
    id: 2,
    title: "DTU Connect Mobile App",
    description: "A mobile application to connect DTU students and facilitate campus-wide communication with features like event notifications and group chats.",
    date: "June 2023",
    category: "App Dev",
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    github: "https://github.com/dtu-connect/mobile-app",
    demo: "https://dtu-connect.dev",
    tags: ["Flutter", "Firebase", "Dart"]
  },
  {
    id: 3,
    title: "AI Study Companion",
    description: "An AI-powered study assistant that helps students optimize their learning experience using personalized study schedules and smart recommendations.",
    date: "August 2023",
    category: "ML/AI",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    github: "https://github.com/gdg-ai/study-companion",
    demo: "https://ai-study-companion.dev",
    tags: ["Python", "TensorFlow", "React"]
  },
  {
    id: 4,
    title: "Secure Campus",
    description: "A comprehensive security solution for educational institutions with advanced threat detection and real-time monitoring capabilities.",
    date: "September 2023",
    category: "Cyber Security",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80",
    github: "https://github.com/secure-campus/dashboard",
    demo: "https://secure-campus.dev",
    tags: ["Node.js", "Express", "MongoDB"]
  },
  {
    id: 5,
    title: "Learning Management Redesign",
    description: "A UX redesign project for the university's learning management system with improved accessibility and modern interface.",
    date: "October 2023",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    github: "https://github.com/gdg-design/lms-redesign",
    demo: "https://lms-redesign.figma.dev",
    tags: ["Figma", "Adobe XD", "UI Design"]
  },
  {
    id: 6,
    title: "Open Source Contribution Hub",
    description: "A platform to track and encourage open source contributions from university students with gamification elements and badges.",
    date: "November 2023",
    category: "Open Source",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    github: "https://github.com/gdg-opensource/contrib-hub",
    demo: "https://contrib-hub.dev",
    tags: ["Vue.js", "GraphQL", "PostgreSQL"]
  }
];


// export const resources = [
//     {
//       id: 1,
//       type: "course",
//       icon: <BookOpen className="h-5 w-5 mr-2 text-blue-600" />,
//       category: "Android",
//       title: "Android Development for Beginners",
//       description:
//         "Learn the basics of Android app development with Kotlin. This comprehensive course covers everything from setup to publishing.",
//       price: "Free",
//     },
//     {
//       id: 2,
//       type: "tutorial",
//       icon: `<Video className="h-5 w-5 mr-2 text-red-600" />`,
//       category: "Web",
//       title: "Building with Next.js and Firebase",
//       description:
//         "A step-by-step tutorial on how to build a full-stack application using Next.js and Firebase. Includes authentication and database.",
//       price: "Free",
//     },
//     {
//       id: 3,
//       type: "tool",
//       icon: <Code className="h-5 w-5 mr-2 text-green-600" />,
//       category: "Cloud",
//       title: "Google Cloud Platform Essentials",
//       description:
//         "A collection of tools and resources to help you get started with Google Cloud Platform. Includes $300 free credit.",
//       price: "Free Trial",
//     },
//     {
//       id: 4,
//       type: "course",
//       icon: <BookOpen className="h-5 w-5 mr-2 text-purple-600" />,
//       category: "ML",
//       title: "Machine Learning with TensorFlow",
//       description:
//         "Learn machine learning concepts and how to implement them using TensorFlow. Includes hands-on projects.",
//       price: "Premium",
//     },
//   ];


export  const blog = [
    {
      id: 1,
      category: "Technology",
      categoryColor: "blue",
      date: "April 10, 2023",
      title: "My Journey Learning Flutter: Tips and Tricks",
      description:
        "In this blog post, I share my experience learning Flutter and some useful tips and tricks I discovered along the way.",
      author: {
        name: "Rahul Sharma",
        role: "3rd Year, Computer Science",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      image:
        "https://miro.medium.com/v2/resize:fit:1400/1*TFZQzyVAHLVXI_wNreokGA.png",
    },
    {
      id: 2,
      category: "Event Recap",
      categoryColor: "green",
      date: "March 25, 2023",
      title: "Highlights from Google I/O Extended DTU",
      description:
        "A recap of the Google I/O Extended event held at DTU. Learn about the latest announcements and how they impact developers.",
      author: {
        name: "Priya Patel",
        role: "GDG Lead, DTU",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      image:
        "https://miro.medium.com/v2/resize:fit:1400/1*-R8GwOL9Jn-YBiMJ_2K-Bw.jpeg",
    },
    {
      id: 3,
      category: "Tutorial",
      categoryColor: "red",
      date: "March 15, 2023",
      title: "Building a Serverless API with Firebase Functions",
      description:
        "A step-by-step tutorial on how to build a serverless API using Firebase Cloud Functions. Perfect for beginners.",
      author: {
        name: "Amit Kumar",
        role: "4th Year, IT",
        image: "https://randomuser.me/api/portraits/men/68.jpg",
      },
      image: "https://firebase.google.com/images/social.png",
    },
  ];


export  const cardsData = [
    {
      title: "Learn",
      description:
        "Learn about Google technologies through workshops, events, and project-based learning.",
      icon: <svg width="50" height="50" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="29.4946" cy="29.4946" r="29.4946" fill="#629AF6" fillOpacity="0.28"/>
      <path d="M23.717 20.8247L14.7366 29.8051L23.0846 38.1532" stroke="#4988F0" strokeWidth="2.50428"/>
      <path d="M34.8563 20.8247L43.8367 29.8051L35.4887 38.1532" stroke="#4988F0" strokeWidth="2.50428"/>
      </svg>,
      bgColor: "bg-blue-100",
    },
    {
      title: "Grow",
      description:
        "Learn about Google technologies through workshops, events, and project-based learning.",
      icon: <img className="w-[24px] h-[24px]" src="iconsBulb.png" alt="" />,
      bgColor: "bg-red-100",
    },
    {
      title: "Connect",
      description:
        "Learn about Google technologies through workshops, events, and project-based learning.",
      icon: <img className="w-[30px] h-[30px]" src="iconsConnect.png" alt="" />,
      bgColor: "bg-green-100",
    },
  ];



export const presidentData = {
  name: "Shubham Goswami",
  role: "President, GDG DTU", 
  image: presidentImg,
};


export const teamMembers = [
  {
    name: "Vishesh",
    role: "Web Developer", 
    image: visheshImg,
  },
  {
    name: "Ravi",
    role: " GDSC-Web Dev Lead", 
    image: raviImg,
  },
  {
    name: "Somya Srivastav",
    role: "UI-UX Department", 
    image: somyaImg,
  },
  {
    name: "Nikunj Sharma",
    role: "Web-Developer", 
    image: nikunjImg,
  },
  {
    name: "Lakshay",
    role: "Web-Developer", 
    image: lakshayImg,
  },
  {
    name: "Arihant Srivastava", 
    role: "Web-Developer",
    image: arihantImg,
  },
  {
    name: "Ayushman Singh", 
    role: "Web-Developer",
    image: ayushmanImg,
  },
  {
    name: "Yash Kumar",
    role: "Web-Developer", 
    image: yashImg,
  },
  {
    name: "Sahil Chauhan",
    role: "Web-Developer", 
    image: sahilImg,
  },
  {
    name: "Sonal Verma",
    role: "Web-Developer", 
    image: sonalImg,
  },
];

