import { useState } from 'react';
import { personalInfo } from '../data/portfolio';
import { useScrollReveal, useMagnetic } from '../hooks/useAnimations';
import { fadeUp, stagger } from '../lib/motion';
import SplitText from './SplitText';
import Reveal, { RevealGroup } from './Reveal';
import {
    FaEnvelope, FaMapMarkerAlt, FaPhone,
    FaGithub, FaLinkedin, FaPaperPlane
} from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

export default function Contact() {
    const [ref] = useScrollReveal();
    const submitMagnet = useMagnetic(0.25);
    const [formData, setFormData] = useState({
        name: '', email: '', subject: '', message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
            }
        } catch {
            setStatus({ type: 'error', message: 'Could not reach the server. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact" id="contact" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <Reveal variant="fade">
                        <span className="section-label">Get in Touch</span>
                    </Reveal>
                    <SplitText
                        text="Let's Work Together"
                        highlight="Together"
                        as="h2"
                        className="section-title"
                    />
                    <Reveal variant="fade" delay={0.25}>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life
                        </p>
                    </Reveal>
                </div>

                <div className="contact-content">
                    <Reveal variant="left" delay={0.1} className="contact-info">
                        <div className="contact-info-card glass-card">
                            <h3 className="contact-info-title">Contact Information</h3>
                            <p className="contact-info-desc">
                                Feel free to reach out through any of these channels. I typically respond within 24 hours.
                            </p>

                            <RevealGroup
                                className="contact-details"
                                staggerChildren={0.12}
                            >
                                <motion.div className="contact-detail-item" variants={fadeUp}>
                                    <div className="contact-detail-icon">
                                        <FaEnvelope size={18} />
                                    </div>
                                    <div>
                                        <span className="contact-detail-label">Email</span>
                                        <a href={`mailto:${personalInfo.email}`} className="contact-detail-value">
                                            {personalInfo.email}
                                        </a>
                                    </div>
                                </motion.div>

                                <motion.div className="contact-detail-item" variants={fadeUp}>
                                    <div className="contact-detail-icon">
                                        <FaPhone size={18} />
                                    </div>
                                    <div>
                                        <span className="contact-detail-label">Phone</span>
                                        <span className="contact-detail-value">{personalInfo.phone}</span>
                                    </div>
                                </motion.div>

                                <motion.div className="contact-detail-item" variants={fadeUp}>
                                    <div className="contact-detail-icon">
                                        <FaMapMarkerAlt size={18} />
                                    </div>
                                    <div>
                                        <span className="contact-detail-label">Location</span>
                                        <span className="contact-detail-value">{personalInfo.location}</span>
                                    </div>
                                </motion.div>
                            </RevealGroup>

                            <div className="contact-socials">
                                <a href={personalInfo.social.github} target="_blank" rel="noreferrer" className="contact-social-icon" aria-label="GitHub">
                                    <FaGithub size={20} />
                                </a>
                                <a href={personalInfo.social.linkedin} target="_blank" rel="noreferrer" className="contact-social-icon" aria-label="LinkedIn">
                                    <FaLinkedin size={20} />
                                </a>
                                <a href={personalInfo.social.upwork} target="_blank" rel="noreferrer" className="contact-social-icon" aria-label="Upwork">
                                    <SiUpwork size={20} />
                                </a>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal variant="right" delay={0.2} className="contact-form-wrapper">
                        <form className="contact-form glass-card" onSubmit={handleSubmit}>
                            <motion.div
                                className="contact-fields"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                variants={stagger(0.08)}
                            >
                                <div className="form-row">
                                    <motion.div className="form-group" variants={fadeUp}>
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </motion.div>
                                    <motion.div className="form-group" variants={fadeUp}>
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </motion.div>
                                </div>

                                <motion.div className="form-group" variants={fadeUp}>
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Project Discussion"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </motion.div>

                                <motion.div className="form-group" variants={fadeUp}>
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        placeholder="Tell me about your project..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </motion.div>
                            </motion.div>

                            <AnimatePresence>
                                {status.message && (
                                    <motion.div
                                        className={`form-status ${status.type}`}
                                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        transition={{ duration: 0.35 }}
                                    >
                                        {status.message}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                type="submit"
                                className="btn btn-primary submit-btn"
                                disabled={isSubmitting}
                                {...submitMagnet}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane size={14} />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
