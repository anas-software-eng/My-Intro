import { useRef } from 'react';
import { personalInfo, stats } from '../data/portfolio';
import { useTypewriter, useCountUp, useMouseParallax } from '../hooks/useAnimations';
import { scrollToId } from '../lib/scroll';
import { fadeUp, stagger } from '../lib/motion';
import profilePhoto from '../assets/myself.jfif';
import SplitText from './SplitText';
import { FaGithub, FaLinkedin, FaArrowDown, FaDownload } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import { motion, useTransform } from 'framer-motion';
import './Hero.css';

function StatCard({ stat, active }) {
    const display = useCountUp(stat.number, active, 1800);

    return (
        <motion.div className="stat-card glass-card" variants={fadeUp}>
            <span className="stat-number gradient-text">{display}</span>
            <span className="stat-label">{stat.label}</span>
        </motion.div>
    );
}

export default function Hero({ introDone = true }) {
    const roles = useTypewriter([
        'Full Stack Developer',
        'React Specialist',
        'Node.js Expert',
        'UI/UX Enthusiast',
        'Freelancer'
    ]);

    const sectionRef = useRef(null);

    // One shared pointer source, scaled per orb for parallax depth.
    const { x, y } = useMouseParallax(1);
    const orb1X = useTransform(x, (v) => v * 46);
    const orb1Y = useTransform(y, (v) => v * 46);
    const orb2X = useTransform(x, (v) => v * 24);
    const orb2Y = useTransform(y, (v) => v * 24);
    const orb3X = useTransform(x, (v) => v * 64);
    const orb3Y = useTransform(y, (v) => v * 64);

    const go = (id) => scrollToId(id);

    return (
        <section className="hero" id="hero" ref={sectionRef}>
            <div className="hero-bg">
                <motion.div className="hero-orb-layer" style={{ x: orb1X, y: orb1Y }}>
                    <div className="hero-orb hero-orb-1" />
                </motion.div>
                <motion.div className="hero-orb-layer" style={{ x: orb2X, y: orb2Y }}>
                    <div className="hero-orb hero-orb-2" />
                </motion.div>
                <motion.div className="hero-orb-layer" style={{ x: orb3X, y: orb3Y }}>
                    <div className="hero-orb hero-orb-3" />
                </motion.div>
                <div className="hero-grid" />
                <div className="hero-vignette" />
            </div>

            <div className="hero-content container">
                <div className="hero-main">
                    <motion.div
                        className="hero-text"
                        initial="hidden"
                        animate={introDone ? 'show' : 'hidden'}
                        variants={stagger(0.1, 0.05)}
                    >
                        <motion.div className="hero-badge" variants={fadeUp}>
                            <span className="badge-dot" />
                            Available for Working on your projects
                        </motion.div>
                        <h1 className="hero-title">
                            <motion.span
                                className="hero-hello"
                                variants={fadeUp}
                                style={{ display: 'block' }}
                            >
                                Hi, I&apos;m
                            </motion.span>
                            <SplitText
                                text={personalInfo.name}
                                as="span"
                                className="hero-name"
                                play={introDone}
                            />
                        </h1>

                        <motion.div className="hero-role" variants={fadeUp}>
                            <span className="role-prefix">I&apos;m a </span>
                            <span className="role-text">{roles}</span>
                            <span className="cursor-blink">|</span>
                        </motion.div>

                        <motion.p className="hero-description" variants={fadeUp}>
                            {personalInfo.description}
                        </motion.p>

                        <motion.div className="hero-actions" variants={fadeUp}>
                            <button className="btn btn-primary" onClick={() => go('projects')}>
                                View My Work
                                <motion.span
                                    animate={{ y: [0, 4, 0] }}
                                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                                    style={{ display: 'inline-flex' }}
                                >
                                    <FaArrowDown size={14} />
                                </motion.span>
                            </button>
                            <a href={personalInfo.resumeUrl} className="btn btn-outline" download rel="noreferrer">
                                <FaDownload size={14} />
                                Download Resume
                            </a>
                            <button className="btn btn-outline" onClick={() => go('contact')}>
                                Let&apos;s Talk
                            </button>
                        </motion.div>

                        <motion.div className="hero-socials" variants={fadeUp}>
                            <a href={personalInfo.social.github} target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                                <FaGithub size={20} />
                            </a>
                            <a href={personalInfo.social.linkedin} target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                                <FaLinkedin size={20} />
                            </a>
                            <a href={personalInfo.social.upwork} target="_blank" rel="noreferrer" className="social-icon" aria-label="Upwork">
                                <SiUpwork size={20} />
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-portrait-wrap"
                        initial={{ opacity: 0, x: 32 }}
                        animate={introDone ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                    >
                        <img
                            className="hero-portrait"
                            src={profilePhoto}
                            alt="Anas Jameel, Full Stack Developer"
                        />
                    </motion.div>
                </div>

                <motion.div
                    className="hero-stats"
                    initial="hidden"
                    animate={introDone ? 'show' : 'hidden'}
                    variants={stagger(0.12, 0.5)}
                >
                    {stats.map((stat) => (
                        <StatCard key={stat.label} stat={stat} active={introDone} />
                    ))}
                </motion.div>
            </div>

            <motion.div
                className="scroll-indicator"
                onClick={() => go('about')}
                initial={{ opacity: 0 }}
                animate={introDone ? { opacity: 1 } : {}}
                transition={{ delay: 1.6, duration: 0.8 }}
            >
                <div className="scroll-mouse">
                    <div className="scroll-wheel" />
                </div>
                <span>Scroll Down</span>
            </motion.div>
        </section>
    );
}
