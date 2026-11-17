/* eslint-disable no-unused-vars -- icons kept for the commented-out skill entries below */
import {
    FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaFigma, FaAws,
    FaLaptopCode, FaServer, FaPaintBrush, FaDatabase
} from 'react-icons/fa';
import {
    SiTypescript, SiJavascript, SiMongodb, SiPostgresql,
    SiRedux, SiTailwindcss, SiExpress, SiFirebase
} from 'react-icons/si';
/* eslint-enable no-unused-vars */

export const personalInfo = {
    name: "Anas Jameel",
    title: "Full Stack Developer",
    tagline: "Building digital experiences that matter",
    description: "Passionate full-stack developer specializing in crafting modern, scalable web applications. I turn complex problems into elegant, user-friendly solutions that drive business growth.",
    email: "anasjameel188@gmail.com",
    phone: "+92 309 8127814",
    location: "Lahore, Pakistan",
    resumeUrl: "/resume.pdf",
    social: {
        github: "https://github.com/anas-software-eng",
        linkedin: "https://www.linkedin.com/in/anas-software-eng/",
        upwork: "https://www.upwork.com/freelancers/~0170accaa9f85b2a0a",
        twitter: "https://twitter.com/AnasJameel"
    }
};

export const stats = [
    { number: "4+", label: "Years Experience" },
    { number: "25+", label: "Projects Delivered" },
    { number: "15+", label: "Happy Clients" },
    { number: "99%", label: "Client Satisfaction" }
];

export const skills = [
    { name: "React.js", icon: FaReact, level: 95, category: "frontend" },
    { name: "TypeScript", icon: SiTypescript, level: 90, category: "frontend" },
    { name: "JavaScript", icon: SiJavascript, level: 95, category: "frontend" },
    // { name: "Redux", icon: SiRedux, level: 85, category: "frontend" },
    { name: "TailwindCSS", icon: SiTailwindcss, level: 90, category: "frontend" },
    { name: "Node.js", icon: FaNodeJs, level: 90, category: "backend" },
    { name: "Express.js", icon: SiExpress, level: 88, category: "backend" },
    { name: "Python", icon: FaPython, level: 80, category: "backend" },
    { name: "MongoDB", icon: SiMongodb, level: 85, category: "backend" },
    // { name: "PostgreSQL", icon: SiPostgresql, level: 82, category: "backend" },
    // { name: "Firebase", icon: SiFirebase, level: 80, category: "backend" },
    // { name: "Docker", icon: FaDocker, level: 75, category: "tools" },
    { name: "Git", icon: FaGitAlt, level: 90, category: "tools" },
    // { name: "AWS", icon: FaAws, level: 72, category: "tools" },
    { name: "Figma", icon: FaFigma, level: 78, category: "tools" },
];

export const projects = [
    {
        id: 1,
        title: "Krub",
        subtitle: "Wholesale Group Buying Platform",
        description: "A wholesale platform where communities can pool orders, track savings, and source products together.",
        tech: ["Next.js", "React", "Group buying"],
        category: "fullstack",
        features: ["Wholesale communities", "Pooled orders", "Savings tracking", "Product sourcing"],
        github: null,
        live: "https://krub.ai/",
        color: "#6C63FF"
    },
    {
        id: 2,
        title: "SeeBiz Inventory Management",
        subtitle: "Inventory Management System",
        description: "An inventory management application for organizing and managing business stock through the SeeBiz platform.",
        tech: ["React", "Bootstrap"],
        category: "fullstack",
        features: ["Inventory management", "Business platform", "Online access"],
        github: null,
        live: "https://inventory.seebiz.com/",
        color: "#FF6584"
    },
    {
        id: 3,
        title: "ConnectMedic",
        subtitle: "Secure Healthcare Messaging",
        description: "A secure messaging platform that connects patients with their care teams, with encrypted communication available around the clock.",
        tech: ["React", "Real-time messaging"],
        category: "fullstack",
        features: ["Patient messaging", "Care team communication", "Encrypted messaging", "24/7 access"],
        github: null,
        live: "https://connectmedic-frontend.vercel.app/",
        color: "#00D2FF"
    },
    {
        id: 4,
        title: "SeeBiz Books",
        subtitle: "Business Books Application",
        description: "A web-based Books application within the SeeBiz business platform, available through its account access page.",
        tech: ["React", "Business application"],
        category: "frontend",
        features: ["Books app", "SeeBiz platform", "Account access"],
        github: null,
        live: "https://books.seebiz.com/loginreplace",
        color: "#7C4DFF"
    }
];

export const experience = [
    {
        id: 1,
        role: "Full Stack Engineer",
        company: "Turn Feat AI",
        description: "Developed and maintained responsive web applications across the MERN stack.",
        achievements: [
            "Developed and maintained responsive web applications using React.js, Node.js, Express.js, and MongoDB",
            "Built RESTful APIs, implemented CRUD operations, and integrated frontend and backend services",
            "Leveraged Claude and GitHub Copilot for AI-assisted development, debugging, and feature enhancement"
        ]
    },
    {
        id: 2,
        role: "Frontend Engineer",
        company: "SeeBiz Pvt. Ltd.",
        description: "Developed and maintained responsive user interfaces and improved application usability.",
        achievements: [
            "Developed and maintained responsive user interfaces using React.js, JavaScript (ES6+), HTML5, and CSS3",
            "Collaborated with cross-functional teams to deliver scalable, maintainable, and user-friendly web applications",
            "Improved existing features, resolved UI issues, and enhanced application usability"
        ]
    }
];

export const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "CEO, TechStart",
        text: "Exceptional developer who delivered beyond our expectations. The e-commerce platform he built handles thousands of transactions daily without a hitch. Highly recommend!",
        rating: 5
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Product Manager, InnovateCo",
        text: "Working with Anas was a game-changer for our project. His attention to detail, clean code, and proactive communication made the entire development process smooth.",
        rating: 5
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Founder, HealthTech Solutions",
        text: "The API architecture he designed for our healthcare platform was incredibly well-thought-out. He understood the compliance requirements and delivered a secure, scalable solution.",
        rating: 5
    }
];

export const services = [
    {
        title: "Full Stack Development",
        description: "End-to-end web application development from database design to pixel-perfect UI implementation.",
        icon: FaLaptopCode
    },
    {
        title: "API Development",
        description: "RESTful and GraphQL API design, development, and integration with third-party services.",
        icon: FaServer
    },
    {
        title: "UI/UX Implementation",
        description: "Converting designs into responsive, accessible, and performant web interfaces.",
        icon: FaPaintBrush
    },
    {
        title: "Database Design",
        description: "Scalable database architecture with SQL and NoSQL solutions optimized for performance.",
        icon: FaDatabase
    }
];
