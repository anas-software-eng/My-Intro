import { experience } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useAnimations';
import { FaBriefcase, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Experience.css';

export default function Experience() {
    const [ref, isVisible] = useScrollReveal();

    return (
        <section className="experience" id="experience" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Career</span>
                    <h2 className="section-title">
                        Work{' '}
                        <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        My professional journey and the impact I've made along the way
                    </p>
                </motion.div>

                <div className="timeline">
                    {experience.map((exp, i) => (
                        <motion.div
                            key={exp.id}
                            className="timeline-item"
                            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                            animate={isVisible ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 * i }}
                        >
                            <div className="timeline-dot">
                                <FaBriefcase size={14} />
                            </div>
                            <div className="timeline-card glass-card">
                                <div className="timeline-header">
                                    <div>
                                        <h3 className="timeline-role">{exp.role}</h3>
                                        <span className="timeline-company">{exp.company}</span>
                                    </div>
                                    <span className="timeline-duration">{exp.duration}</span>
                                </div>
                                <p className="timeline-desc">{exp.description}</p>
                                <ul className="timeline-achievements">
                                    {exp.achievements.map((a, j) => (
                                        <li key={j} className="achievement-item">
                                            <FaCheckCircle className="achievement-icon" />
                                            <span>{a}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
