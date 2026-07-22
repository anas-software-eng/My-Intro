import { personalInfo, services } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useAnimations';
import { FaMapMarkerAlt, FaEnvelope, FaBriefcase } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './About.css';

export default function About() {
    const [ref, isVisible] = useScrollReveal();

    return (
        <section className="about" id="about" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">About Me</span>
                    <h2 className="section-title">
                        Passionate About Creating{' '}
                        <span className="gradient-text">Digital Excellence</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        I craft modern web applications that combine stunning design with robust engineering
                    </p>
                </motion.div>

                <div className="about-content">
                    <motion.div
                        className="about-info"
                        initial={{ opacity: 0, x: -40 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="about-card glass-card">
                            <h3 className="about-card-title">Who I Am</h3>
                            <p className="about-text">
                                I'm a full-stack developer with 3+ years of experience building scalable web applications.
                                My journey started with curiosity about how things work on the web, and evolved into a
                                passion for crafting exceptional digital experiences.
                            </p>
                            <p className="about-text">
                                I specialize in the <strong>MERN stack</strong> (MongoDB, Express.js, React, Node.js) and
                                love working on projects that challenge me to grow. Whether it's an e-commerce platform,
                                a SaaS product, or a custom dashboard, I bring the same level of dedication and quality.
                            </p>

                            <div className="about-details">
                                <div className="about-detail-item">
                                    <FaMapMarkerAlt className="detail-icon" />
                                    <span>{personalInfo.location}</span>
                                </div>
                                <div className="about-detail-item">
                                    <FaEnvelope className="detail-icon" />
                                    <span>{personalInfo.email}</span>
                                </div>
                                <div className="about-detail-item">
                                    <FaBriefcase className="detail-icon" />
                                    <span>Available for Freelance</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="about-services"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {services.map((service, i) => (
                            <div key={i} className="service-card glass-card">
                                <span className="service-icon">{service.icon}</span>
                                <div>
                                    <h4 className="service-title">{service.title}</h4>
                                    <p className="service-desc">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
