import {
    FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaFigma, FaAws
} from 'react-icons/fa';
import {
    SiTypescript, SiJavascript, SiMongodb, SiPostgresql,
    SiRedux, SiTailwindcss, SiExpress, SiFirebase
} from 'react-icons/si';

export const personalInfo = {
    name: "Anas Jameel",
    title: "Full Stack Developer",
    tagline: "Building digital experiences that matter",
    description: "Passionate full-stack developer specializing in crafting modern, scalable web applications. I turn complex problems into elegant, user-friendly solutions that drive business growth.",
    email: "anasjameel188@gmail.com",
    phone: "+92 309 8127814",
    location: "Lahore, Pakistan",
    resumeUrl: "/resume.txt",
    social: {
        github: "https://github.com/anas-software-eng",
        linkedin: "https://www.linkedin.com/in/anas-software-eng/",
        upwork: "https://www.upwork.com/freelancers/~0170accaa9f85b2a0a",
        twitter: "https://twitter.com/AnasJameel"
    }
};

export const stats = [
    { number: "3+", label: "Years Experience" },
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
        title: "E-Commerce Platform",
        subtitle: "Full-Stack Web Application",
        description: "A complete e-commerce solution with real-time inventory management, Stripe payment integration, admin dashboard, and customer analytics. Built with scalability in mind to handle 10K+ concurrent users.",
        tech: ["React", "Node.js", "MongoDB", "Stripe", "Redis", "Docker"],
        category: "fullstack",
        features: ["Real-time inventory", "Payment processing", "Admin dashboard", "Analytics"],
        github: "#",
        live: "#",
        color: "#6C63FF"
    },
    {
        id: 2,
        title: "Project Management Tool",
        subtitle: "SaaS Application",
        description: "A Jira-like project management tool with drag-and-drop Kanban boards, team collaboration features, time tracking, sprint planning, and comprehensive reporting.",
        tech: ["React", "TypeScript", "Express", "PostgreSQL", "Socket.IO"],
        category: "fullstack",
        features: ["Kanban boards", "Sprint planning", "Time tracking", "Team chat"],
        github: "#",
        live: "#",
        color: "#FF6584"
    },
    {
        id: 3,
        title: "AI Content Generator",
        subtitle: "Machine Learning Application",
        description: "An intelligent content generation platform leveraging OpenAI APIs for blog posts, social media content, and marketing copy. Features include tone adjustment, SEO optimization, and multi-language support.",
        tech: ["React", "Python", "FastAPI", "OpenAI", "PostgreSQL"],
        category: "fullstack",
        features: ["AI generation", "SEO optimization", "Multi-language", "Templates"],
        github: "#",
        live: "#",
        color: "#00D2FF"
    },
    {
        id: 4,
        title: "Real-Time Chat Application",
        subtitle: "Communication Platform",
        description: "Feature-rich messaging application with end-to-end encryption, group chats, file sharing, voice messages, and video calling capabilities using WebRTC.",
        tech: ["React", "Node.js", "Socket.IO", "WebRTC", "MongoDB"],
        category: "fullstack",
        features: ["E2E encryption", "Video calls", "File sharing", "Group chats"],
        github: "#",
        live: "#",
        color: "#7C4DFF"
    },
    {
        id: 5,
        title: "Finance Dashboard",
        subtitle: "Data Visualization App",
        description: "Interactive financial dashboard with real-time stock data, portfolio tracking, expense analytics, and predictive insights using chart.js and D3.js visualizations.",
        tech: ["React", "D3.js", "Node.js", "Firebase", "Chart.js"],
        category: "frontend",
        features: ["Live charts", "Portfolio tracking", "Expense analytics", "Predictions"],
        github: "#",
        live: "#",
        color: "#00E676"
    },
    {
        id: 6,
        title: "Healthcare API",
        subtitle: "REST API Platform",
        description: "HIPAA-compliant REST API for healthcare applications with patient management, appointment scheduling, prescription tracking, and secure data exchange.",
        tech: ["Node.js", "Express", "PostgreSQL", "JWT", "Docker"],
        category: "backend",
        features: ["HIPAA compliant", "Patient management", "Scheduling", "Secure exchange"],
        github: "#",
        live: "#",
        color: "#FF9100"
    }
];

export const experience = [
    {
        id: 1,
        role: "Senior Full Stack Developer",
        company: "Tech Solutions Inc.",
        duration: "2024 - Present",
        description: "Leading development of enterprise-grade web applications, mentoring junior developers, and implementing CI/CD pipelines. Reduced deployment time by 60% through automation.",
        achievements: [
            "Led a team of 5 developers on 3 major projects",
            "Reduced page load time by 40% through optimization",
            "Implemented microservices architecture serving 50K+ users"
        ]
    },
    {
        id: 2,
        role: "Full Stack Developer",
        company: "Digital Agency Co.",
        duration: "2023 - 2024",
        description: "Developed and maintained multiple client-facing applications using React and Node.js. Collaborated with design teams to deliver pixel-perfect UIs.",
        achievements: [
            "Delivered 12+ client projects on time and within budget",
            "Built reusable component library used across 8 projects",
            "Achieved 99.9% uptime for all deployed applications"
        ]
    },
    {
        id: 3,
        role: "Frontend Developer",
        company: "Startup Hub",
        duration: "2022 - 2023",
        description: "Focused on building responsive, accessible web interfaces for startups. Specialized in React.js, state management, and performance optimization.",
        achievements: [
            "Converted Figma designs to pixel-perfect React components",
            "Improved Lighthouse scores from 65 to 95 across all projects",
            "Integrated third-party APIs and payment gateways"
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
        icon: "🚀"
    },
    {
        title: "API Development",
        description: "RESTful and GraphQL API design, development, and integration with third-party services.",
        icon: "⚡"
    },
    {
        title: "UI/UX Implementation",
        description: "Converting designs into responsive, accessible, and performant web interfaces.",
        icon: "🎨"
    },
    {
        title: "Database Design",
        description: "Scalable database architecture with SQL and NoSQL solutions optimized for performance.",
        icon: "🗄️"
    }
];
