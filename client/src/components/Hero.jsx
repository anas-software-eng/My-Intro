import { personalInfo, stats } from '../data/portfolio';
import { useTypewriter } from '../hooks/useAnimations';
import { FaGithub, FaLinkedin, FaArrowDown, FaDownload } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
    const roles = useTypewriter([
        'Full Stack Developer',
        'React Specialist',
        'Node.js Expert',
        'UI/UX Enthusiast',
        'Freelancer'
    ]);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero" id="hero">
            <div className="hero-bg">
                <div className="hero-orb hero-orb-1" />
                <div className="hero-orb hero-orb-2" />
                <div className="hero-orb hero-orb-3" />
                <div className="hero-grid" />
            </div>

            <div className="hero-content container">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <div className="hero-badge">
                        <span className="badge-dot" />
                        Available for  Working on your projects
                    </div>

                    <h1 className="hero-title">
                        Hi, I'm{' '}
                        <span className="gradient-text">{personalInfo.name}</span>
                    </h1>

                    <div className="hero-role">
                        <span className="role-prefix">I'm a </span>
                        <span className="role-text">{roles}</span>
                        <span className="cursor-blink">|</span>
                    </div>

                    <p className="hero-description">{personalInfo.description}</p>

                    <div className="hero-actions">
                        <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
                            View My Work
                            <FaArrowDown size={14} />
                        </button>
                        <a href={personalInfo.resumeUrl} className="btn btn-outline" download rel="noreferrer">
                            <FaDownload size={14} />
                            Download Resume
                        </a>
                        <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
                            Let's Talk
                        </button>
                    </div>

                    <div className="hero-socials">
                        <a href={personalInfo.social.github} target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                            <FaGithub size={20} />
                        </a>
                        <a href={personalInfo.social.linkedin} target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                            <FaLinkedin size={20} />
                        </a>
                        <a href={personalInfo.social.upwork} target="_blank" rel="noreferrer" className="social-icon" aria-label="Upwork">
                            <SiUpwork size={20} />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="stat-card glass-card">
                            <span className="stat-number gradient-text">{stat.number}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="scroll-indicator" onClick={() => scrollTo('about')}>
                <div className="scroll-mouse">
                    <div className="scroll-wheel" />
                </div>
                <span>Scroll Down</span>
            </div>
        </section>
    );
}
