import { useRef } from 'react';
import { personalInfo, services } from '../data/portfolio';
import { useScrollReveal, useParallax } from '../hooks/useAnimations';
import { fadeUp, stagger } from '../lib/motion';
import SplitText from './SplitText';
import Reveal, { RevealGroup } from './Reveal';
import { FaMapMarkerAlt, FaEnvelope, FaBriefcase } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './About.css';

/** Splits a paragraph into words that rise in sequence on scroll. */
function WordReveal({ text, className = '', delay = 0, accent }) {
    const accentWords = accent
        ? new Set(accent.toLowerCase().split(/\s+/))
        : new Set();

    return (
        <motion.p
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger(0.02, delay)}
        >
            {text.split(' ').map((word, i) => {
                const clean = word.replace(/[^a-z]/gi, '').toLowerCase();
                const isAccent = accentWords.has(clean);

                return (
                    // The space lives OUTSIDE the inline-block span:
                    // collapsible whitespace at the end of an inline-block
                    // is stripped by CSS, which would glue words together.
                    <span key={`${word}-${i}`}>
                        <motion.span
                            className={`about-word ${isAccent ? 'about-word-accent' : ''}`.trim()}
                            variants={{
                                hidden: { opacity: 0, y: 14, filter: 'blur(5px)' },
                                show: {
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)',
                                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                                }
                            }}
                        >
                            {word}
                        </motion.span>{' '}
                    </span>
                );
            })}
        </motion.p>
    );
}

export default function About() {
    const [ref] = useScrollReveal();
    const sectionRef = useRef(null);
    const bgY = useParallax(sectionRef, 60);

    return (
        <section className="about" id="about" ref={ref}>
            <motion.div className="about-glow" style={{ y: bgY }} aria-hidden="true" />
            <div className="container" ref={sectionRef}>
                <div className="section-header">
                    <Reveal variant="fade">
                        <span className="section-label">About Me</span>
                    </Reveal>
                    <SplitText
                        text="Passionate About Creating Digital Excellence"
                        highlight="Digital Excellence"
                        as="h2"
                        className="section-title"
                    />
                    <Reveal variant="fade" delay={0.25}>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            I craft modern web applications that combine stunning design with robust engineering
                        </p>
                    </Reveal>
                </div>

                <div className="about-content">
                    <Reveal variant="left" delay={0.1} className="about-info">
                        <div className="about-card glass-card">
                            <h3 className="about-card-title">Who I Am</h3>

                            <WordReveal
                                className="about-text"
                                delay={0.15}
                                text="I'm a full-stack developer with 3+ years of experience building scalable web applications. My journey started with curiosity about how things work on the web, and evolved into a passion for crafting exceptional digital experiences."
                            />

                            <WordReveal
                                className="about-text"
                                delay={0.35}
                                accent="MERN stack"
                                text="I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) and love working on projects that challenge me to grow. Whether it's an e-commerce platform, a SaaS product, or a custom dashboard, I bring the same level of dedication and quality."
                            />

                            <RevealGroup
                                className="about-details"
                                delay={0.2}
                                staggerChildren={0.08}
                            >
                                <motion.div className="about-detail-item" variants={fadeUp}>
                                    <FaMapMarkerAlt className="detail-icon" />
                                    <span>{personalInfo.location}</span>
                                </motion.div>
                                <motion.div className="about-detail-item" variants={fadeUp}>
                                    <FaEnvelope className="detail-icon" />
                                    <span>{personalInfo.email}</span>
                                </motion.div>
                                <motion.div className="about-detail-item" variants={fadeUp}>
                                    <FaBriefcase className="detail-icon" />
                                    <span>Available for Freelance</span>
                                </motion.div>
                            </RevealGroup>
                        </div>
                    </Reveal>

                    <RevealGroup
                        className="about-services"
                        delay={0.15}
                        staggerChildren={0.12}
                    >
                        {services.map((service) => (
                            <motion.div
                                key={service.title}
                                className="service-card glass-card"
                                variants={fadeUp}
                                whileHover={{ y: -6, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                <motion.span
                                    className="service-icon"
                                    whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {service.icon}
                                </motion.span>
                                <div>
                                    <h4 className="service-title">{service.title}</h4>
                                    <p className="service-desc">{service.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </RevealGroup>
                </div>
            </div>
        </section>
    );
}
