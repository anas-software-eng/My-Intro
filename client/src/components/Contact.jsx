import { useState } from 'react';
import { personalInfo } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useAnimations';
import {
    FaEnvelope, FaMapMarkerAlt, FaPhone,
    FaGithub, FaLinkedin, FaPaperPlane
} from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
    const [ref, isVisible] = useScrollReveal();
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
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Get in Touch</span>
                    <h2 className="section-title">
                        Let's Work{' '}
                        <span className="gradient-text">Together</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Have a project in mind? Let's discuss how I can help bring your ideas to life
                    </p>
                </motion.div>

                <div className="contact-content">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -40 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="contact-info-card glass-card">
                            <h3 className="contact-info-title">Contact Information</h3>
                            <p className="contact-info-desc">
                                Feel free to reach out through any of these channels. I typically respond within 24 hours.
                            </p>

                            <div className="contact-details">
                                <div className="contact-detail-item">
                                    <div className="contact-detail-icon">
                                        <FaEnvelope size={18} />
                                    </div>
                                    <div>
                                        <span className="contact-detail-label">Email</span>
                                        <a href={`mailto:${personalInfo.email}`} className="contact-detail-value">
                                            {personalInfo.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="contact-detail-item">
                                    <div className="contact-detail-icon">
                                        <FaPhone size={18} />
                                    </div>
                                    <div>
                                        <span className="contact-detail-label">Phone</span>
                                        <span className="contact-detail-value">{personalInfo.phone}</span>
                                    </div>
                                </div>

                                <div className="contact-detail-item">
                                    <div className="contact-detail-icon">
                                        <FaMapMarkerAlt size={18} />
                                    </div>
                                    <div>
                                        <span className="contact-detail-label">Location</span>
                                        <span className="contact-detail-value">{personalInfo.location}</span>
                                    </div>
                                </div>
                            </div>

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
                    </motion.div>

                    <motion.div
                        className="contact-form-wrapper"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <form className="contact-form glass-card" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
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
                                </div>
                                <div className="form-group">
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
                                </div>
                            </div>

                            <div className="form-group">
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
                            </div>

                            <div className="form-group">
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
                            </div>

                            {status.message && (
                                <div className={`form-status ${status.type}`}>
                                    {status.message}
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
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
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
