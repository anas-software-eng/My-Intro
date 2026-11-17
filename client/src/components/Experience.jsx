import { useRef } from 'react';
import { experience } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useAnimations';
import { stagger } from '../lib/motion';
import SplitText from './SplitText';
import Reveal from './Reveal';
import { FaBriefcase, FaCheckCircle } from 'react-icons/fa';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './Experience.css';

export default function Experience() {
    const [ref] = useScrollReveal();
    const timelineRef = useRef(null);

    // The gradient line draws itself as the timeline crosses the viewport.
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 0.75', 'end 0.6']
    });
    const drawProgress = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 30,
        restDelta: 0.001
    });
    const lineScale = useTransform(drawProgress, [0, 1], [0, 1]);
    const glowOpacity = useTransform(drawProgress, [0, 0.05, 1], [0, 1, 1]);

    return (
        <section className="experience" id="experience" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <Reveal variant="fade">
                        <span className="section-label">Career</span>
                    </Reveal>
                    <SplitText
                        text="Work Experience"
                        highlight="Experience"
                        as="h2"
                        className="section-title"
                    />
                    <Reveal variant="fade" delay={0.25}>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            My professional journey and the impact I&apos;ve made along the way
                        </p>
                    </Reveal>
                </div>

                <div className="timeline" ref={timelineRef}>
                    <div className="timeline-track" aria-hidden="true" />
                    <motion.div
                        className="timeline-progress"
                        style={{ scaleY: lineScale, opacity: glowOpacity }}
                        aria-hidden="true"
                    />

                    <motion.div
                        className="timeline-items"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={stagger(0.18)}
                    >
                        {experience.map((exp, i) => (
                            <motion.div
                                key={exp.id}
                                className="timeline-item"
                                variants={{
                                    hidden: { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                                    show: {
                                        opacity: 1,
                                        x: 0,
                                        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                                    }
                                }}
                            >
                                <motion.div
                                    className="timeline-dot"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 320,
                                        damping: 16,
                                        delay: 0.15
                                    }}
                                >
                                    <FaBriefcase size={14} />
                                </motion.div>

                                <motion.div
                                    className="timeline-card glass-card"
                                    whileHover={{ x: 8, borderColor: 'rgba(108, 99, 255, 0.4)' }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                                >
                                    <div className="timeline-header">
                                        <div>
                                            <h3 className="timeline-role">{exp.role}</h3>
                                            <span className="timeline-company">{exp.company}</span>
                                        </div>
                                        {exp.duration && (
                                            <span className="timeline-duration">{exp.duration}</span>
                                        )}
                                    </div>
                                    <p className="timeline-desc">{exp.description}</p>
                                    <ul className="timeline-achievements">
                                        {exp.achievements.map((a, j) => (
                                            <motion.li
                                                key={j}
                                                className="achievement-item"
                                                initial={{ opacity: 0, x: -16 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.25 + j * 0.1, duration: 0.5 }}
                                            >
                                                <FaCheckCircle className="achievement-icon" />
                                                <span>{a}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
