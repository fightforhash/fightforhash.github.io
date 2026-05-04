
import { Project, Experience, Education, Publication, BlogPost } from './types';
import { Github, Linkedin, MessageSquare } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Thomas Ha",
  title: "IT Support Specialist · CCNA in Progress",
  tagline: "Keeping infrastructure online. Incidents resolved. Networks stable.",
  bio: "CS major who ended up on the infrastructure side and never looked back. Spent 1.5+ years keeping H Mart's network running across 5+ checkout stations, triaging 20+ weekly tickets, and managing Active Directory for 50+ employees. When I find a manual workflow, I automate it with Python. Currently grinding toward the CCNA.",
  email: "rackoon1030@gmail.com",
  location: "Seattle, WA",
  socials: [
    { name: 'GitHub', url: 'https://github.com/fightforhash', icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/thomas-h-75150019b/', icon: Linkedin },
    { name: 'Blog', url: 'https://fightforhash.hashnode.dev', icon: MessageSquare },
  ],
  contactFormAction: "https://formspree.io/f/mdkogder"
};

export const SKILLS = {
  networking: ["TCP/IP", "DNS", "DHCP", "LAN/WAN", "VPN", "Routers/Switches", "Wi-Fi", "CCNA In Progress"],
  systems: ["Active Directory", "Windows Server", "Linux (Ubuntu)", "Bash", "POS Systems", "MDM", "Remote Troubleshooting"],
  monitoring: ["Ticket Triage (T1/T2)", "Root Cause Analysis", "SLA Compliance", "Endpoint Management", "Incident Response"],
  scripting: ["Python", "SQL", "AWS (EC2/S3)", "Docker", "Nginx", "Git"]
};

export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    role: "IT Support Specialist",
    company: "H Mart — Seattle, WA",
    period: "Jul 2024 – Nov 2025",
    description: [
      "Monitored and maintained network uptime across 5+ checkout stations, troubleshooting TCP/IP, LAN/WAN, and hardware issues (barcode scanners, receipt printers) during peak hours with zero unresolved downtime incidents.",
      "Triaged and resolved 20+ weekly support tickets (Tier 1/2) for POS systems, network connectivity, and endpoint hardware; performed root cause analysis to prevent repeat incidents.",
      "Managed IT onboarding and access control for 50+ employees via Active Directory and Google Workspace, including user provisioning, RBAC, and password management.",
      "Automated daily IT operations and inventory reporting workflows using Python, eliminating manual reconciliation and reducing operational errors.",
      "Identified and corrected data discrepancies in daily POS transaction logs to maintain database accuracy and secure endpoint data integrity."
    ]
  },
  {
    id: "2",
    role: "Information Technology Assistant",
    company: "ULCHI Law Firm — Seoul, South Korea",
    period: "Jul 2020 – Aug 2020",
    description: [
      "Provided end-user IT support for 15+ legal staff: Windows OS configuration, MS Office troubleshooting, and hardware setup/deployment.",
      "Maintained secure network access protocols and managed sensitive legal data backups, ensuring compliance with firm security standards.",
      "Built internal automation tools with Python and MySQL to process 300+ legal documents monthly, improving workflow efficiency by 20%."
    ]
  }
];

export const EDUCATION_HISTORY: Education[] = [
  {
    id: "1",
    degree: "B.S. Computer Science & Information Science",
    institution: "University of Wisconsin–Madison",
    period: "Jan 2021 – May 2024",
    details: ["GPA: 3.5 / 4.0", "Data Structures & Algorithms", "Operating Systems", "Networking", "Databases"]
  },
  {
    id: "2",
    degree: "CCNA — In Progress",
    institution: "Cisco Systems",
    period: "2025 – Present",
    details: ["Routing & Switching", "Network Security", "WAN Technologies", "TCP/IP Stack"]
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "1",
    title: "An Architectural Analysis of an AI-Infused Full-Stack Web Application Powered by RAG",
    conference: "KSEA UKC 2025 (Aug 2025)",
    description: "Presented a poster covering the system's cloud architecture, AWS EC2/S3 deployment workflow, Nginx reverse proxy configuration, Docker containerization, and production infrastructure decisions for a full-stack application.",
    link: "https://drive.google.com/file/d/1iKFNqydrp9rGK_ij2msxzH-YGcrMvgOm/view",
    image: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/Presentation.jpeg"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Deploying LostLink: EC2 + Nginx Reverse Proxy + Docker from Scratch",
    excerpt: "A practical walkthrough of setting up AWS EC2, configuring Nginx as a reverse proxy with HTTPS, containerizing with Docker, and the production debugging lessons that followed.",
    url: "https://fightforhash.hashnode.dev",
    image: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/lightbulb.jpg",
  },
  {
    id: "2",
    title: "Active Directory in Practice: Managing 50+ Users at a Retail Scale",
    excerpt: "Real-world notes on user provisioning, RBAC, and password policy at H Mart — what broke, what I learned, and how to keep AD clean under pressure.",
    url: "https://fightforhash.hashnode.dev",
    image: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/AWS.png",
  },
  {
    id: "3",
    title: "Python Automation for IT Ops: Killing the Manual Reconciliation Loop",
    excerpt: "How I replaced daily manual inventory reporting with a Python script — what the workflow looked like before, the automation logic, and measurable impact on operational errors.",
    url: "https://fightforhash.hashnode.dev",
    image: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/devops.jpg",
  }
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "LostLink",
    description: "Deployed and managed cloud infrastructure on AWS (EC2/S3) with Nginx reverse proxy and Docker containerization. Configured environment-based deployment pipelines, monitored system health, and maintained stable uptime for a mobile lost-and-found platform.",
    techStack: ["AWS EC2/S3", "Docker", "Nginx", "Node.js", "MongoDB", "Auth0", "Vercel"],
    githubUrl: "https://github.com/fightforhash/Lostlink",
    projectUrl: "https://lostlink-rust.vercel.app",
    imageUrl: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/image.png",
    status: "Deployed",
    featured: true
  },
  {
    id: "2",
    title: "FlashBack",
    description: "Integrated and monitored external APIs (Google Maps, Vertex AI, ElevenLabs, iTunes) into a unified Firebase backend. Ensured reliable, low-latency responses for mobile clients under variable load with real-time data sync.",
    techStack: ["TypeScript", "Firebase", "Google Maps API", "Vertex AI", "ElevenLabs", "PWA", "Vite"],
    imageUrl: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/ComingSoon.jpg",
    githubUrl: "https://github.com/fightforhash/FlashBack",
    projectUrl: "https://music-map-drop.vercel.app/",
    status: "Deployed",
    featured: true
  },
  {
    id: "3",
    title: "Coin Calculator",
    description: "Built to solve a real cashier problem at H Mart: uneven coin distribution when giving change. Uses DFS backtracking with standard deviation scoring to find the most balanced coin combination automatically.",
    techStack: ["Python", "DFS", "Statistics", "Algorithm"],
    githubUrl: "https://github.com/fightforhash/CoinCalculator",
    imageUrl: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/StarCoin.jpg",
    featured: false
  },
  {
    id: "4",
    title: "Custom FUSE Filesystem",
    description: "Implemented a full UNIX-style filesystem in user space using FUSE and C. Features inode & block bitmap management, directory hierarchy, file create/read/write/delete, POSIX metadata support, and proper error codes.",
    techStack: ["C", "FUSE", "POSIX API", "mmap", "Makefile"],
    githubUrl: "https://github.com/fightforhash/FUSEfilesystem",
    imageUrl: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/filesystem.jpeg",
    featured: false
  },
  {
    id: "5",
    title: "AI-Powered Othello Game",
    description: "Othello game with an AI opponent using Alpha-Beta Pruning for optimized move selection. Python/Tkinter GUI with MySQL backend for storing user stats and game history.",
    techStack: ["Python", "Algorithm", "Tkinter", "MySQL"],
    githubUrl: "https://github.com/fightforhash/PythonOthello",
    imageUrl: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/othello.jpeg",
    featured: false
  },
  {
    id: "6",
    title: "VR Art Museum Simulator",
    description: "Unity-based VR environment built with C# supporting teleportation and real-time asset interaction. Compatible with VR headsets for immersive visualization and testing.",
    techStack: ["Unity", "C#", "VR", "Asset Simulation"],
    githubUrl: "https://github.com/fightforhash/VRArtMuseumSimulator",
    imageUrl: "https://raw.githubusercontent.com/fightforhash/fightforhash.github.io/master/images/simulator.jpg",
    featured: false
  }
];
