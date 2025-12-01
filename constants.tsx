
import { Project, Experience, Education, Publication, BlogPost } from './types';
import { Github, Linkedin, MessageSquare } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Thomas Ha",
  title: "Frontend & Full-Stack Engineer",
  tagline: "Building clean, responsive, and user-centered web interfaces.",
  bio: "Hi, I'm Thomas. I recently graduated from the University of Wisconsin–Madison with a double major in Computer Science and Information Science. I focus on building clean, responsive, and user-centered web interfaces with modern JavaScript frameworks. My core strength lies in front-end development—working with React, TypeScript, and component-driven design to create intuitive and high-performance experiences. I also enjoy the full-stack pipeline, from designing APIs with Node.js/Express to integrating databases like MySQL and MongoDB. I'm currently deepening my skills in frontend architecture, performance optimization, and scalable deployment workflows. Outside of development, I'm a guitarist drawn to blues and jazz fusion — they keep my creativity sharp and grounded as I create.",
  email: "contact@thomasha.dev", // Placeholder for UI logic, form action is used for actual contact!
  location: "Seattle, WA",
  socials: [
    { name: 'GitHub', url: 'https://github.com/fightforhash', icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/thomas-h-75150019b/', icon: Linkedin },
    { name: 'Blog', url: 'https://fightforhash.hashnode.dev', icon: MessageSquare },
  ],
  contactFormAction: "https://formspree.io/f/mdkogder"
};

export const SKILLS = {
  frontend: ["React", "TypeScript", "JavaScript", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
  backend: ["Node.js", "Express.js", "REST APIs"],
  database: ["MongoDB", "MySQL"],
  tools: ["Git", "GitHub", "Docker", "AWS", "Postman"]
};

export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    role: "Retail Operations & Technical Support",
    company: "H-Mart (Seattle, WA)",
    period: "July 2024 - Nov 2025",
    description: [
      "Collaborated with item vendors and built C++ automation scripts to streamline the product reorder workflow, reducing manual steps and improving inventory turnover efficiency.",
      "Created a C++ change-calculation tool that supported cashiers with accurate and faster checkout operations, contributing to smoother front-end service."
    ]
  },
  {
    id: "2",
    role: "Information Technology Assistant",
    company: "ULCHI Law Firm (Seoul, South Korea)",
    period: "July 2020 - August 2020",
    description: [
      "Supported development of internal case-management tools using Python and MySQL, contributing to improved document handling and workflow efficiency.",
      "Assisted attorneys by analyzing legal disputes and generating data-driven summaries and visualizations with Matplotlib, improving clarity and decision-making during case preparation."
    ]
  }
];

export const EDUCATION_HISTORY: Education[] = [
  {
    id: "1",
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Wisconsin-Madison",
    period: "2021 - 2024",
    details: ["GPA: 3.5/4.0", "Data Structures", "Algorithms", "Operating Systems"]
  },
  {
    id: "2",
    degree: "Bachelor of Science in Information Science",
    institution: "University of Wisconsin-Madison",
    period: "2022 - 2024",
    details: ["Focus on UI/UX Design", "Data Analytics"]
  },
  {
    id: "3",
    degree: "High School Diploma",
    institution: "Kyungmoon High School",
    period: "2017 - 2019",
    details: []
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "1",
    title: "An Architectural Analysis of an AI-Infused Full-Stack Web Application Powered by RAG",
    conference: "KSEA UKC 2025 (Aug 2025)",
    description: "Presented a poster introducing a full-stack web application project, covering the system's architecture, React/TypeScript frontend, Node.js backend API design, and the deployment workflow using AWS EC2 and S3 in a production-like environment.",
    link: "https://drive.google.com/file/d/1iKFNqydrp9rGK_ij2msxzH-YGcrMvgOm/view",
    image: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/Presentation.jpeg"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Building a Local RAG Pipeline on RTX 5080",
    excerpt: "Experiments with LLaVA, FAISS, Node.js, and React Native — covering architecture choices, GPU memory considerations, and real-world performance tradeoffs.",
    url: "https://fightforhash.hashnode.dev",
    image: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/RAGPIPELINE.png",

  },
  {
    id: "2",
    title: "React Design Patterns I wish I knew earlier",
    excerpt: "Lessons learned from building complex interfaces: state management pitfalls, memoization strategies, rendering performance, and practical hook usage in production-level apps.",
    url: "https://fightforhash.hashnode.dev",
    image : "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/REACTPATTERN.png",
  },
  {
    id: "3",
    title: "Deploying Cloud-Native Services on AWS",
    excerpt: "A practical breakdown of Dockerization, CI/CD pipelines, multi-environment provisioning, and scalable backend architecture for full-stack applications.",
    url: "https://fightforhash.hashnode.dev",
    image: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/AWS.png",
  }
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Local RAG Pipeline on RTX 5080 (COMING SOON)",
    description: "End-to-end RAG application featuring local multimodal inference (LLaVA), document ingestion pipeline, GPU memory optimization, and React/Node.js frontend.",
    techStack: ["React", "Node.js", "GPU", "LLaVA", "Docker", "RAG", "FAISS"],
    // projectUrl removed to make it non-clickable
    imageUrl: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/ComingSoon.jpg",
    status: "In Development",
    featured: true
  },
  {
    id: "2",
    title: "LostLink",
    description: "A mobile-first platform that helps organizations manage and match lost & found items using AI-powered metadata tagging and secure user authentication.",
    techStack: ["React", "Node.js", "MongoDB", "AI/ML", "Expo", "Mobile", "Docker", "AWS"],
    githubUrl: "https://github.com/fightforhash/Lostlink",
    imageUrl: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/InProgress.jpg",
    status: "In Progress",
    featured: true
  },
  {
    id: "3",
    title: "Coin Calculator",
    description: "Built to help cashiers struggling with uneven coin distribution when giving change. Uses DFS backtracking and standard deviation to find the most balanced combination of coins automatically.",
    techStack: ["Python", "DFS", "Statistics", "Algorithm"],
    githubUrl: "https://github.com/fightforhash/CoinCalculator",
    imageUrl: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/StarCoin.jpg",
    featured: false
  },
  {
    id: "4",
    title: "Custom FUSE Filesystem",
    description: "Implemented a full UNIX-style filesystem in user space using FUSE and C. Features include inode & block bitmap management, directory hierarchy, file create/read/write/delete, POSIX metadata support, and proper error codes.",
    techStack: ["C", "FUSE", "POSIX API", "mmap", "Makefile"],
    githubUrl: "https://github.com/fightforhash/FUSEfilesystem",
    imageUrl: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/filesystem.jpeg",
    featured: false
  },
  {
    id: "5",
    title: "AI-Powered Othello Game",
    description: "AI-Powered Othello Game featuring Alpha-Beta Pruning algorithm for optimized gameplay. Built with Python, Tkinter GUI, and MySQL for storing user stats. Designed database schema and implemented tables for game data management.",
    techStack: ["Algorithm", "Python", "Tkinter", "MySQL"],
    githubUrl: "https://github.com/fightforhash/PythonOthello",
    imageUrl: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/othello.jpeg",
    featured: false
  },
  {
    id: "6",
    title: "Virtual Reality Art Museum Simulator",
    description: "Developed a Unity Asset Simulator using C# and Unity, enabling users to teleport within a virtual environment. The project supports VR headsets and simulates real-time asset interaction for immersive testing and visualization.",
    techStack: ["Unity", "C#", "Asset Simulation", "VR"],
    githubUrl: "https://github.com/fightforhash/VRArtMuseumSimulator",
    imageUrl: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/simulator.jpg",
    featured: false
  }
];
