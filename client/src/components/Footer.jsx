import { personalInfo } from '../data/portfolio';
import { scrollToId } from '../lib/scroll';
import { fadeUp, stagger } from '../lib/motion';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
    const go = (id) => scrollToId(id);

    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <motion.div
                    className="footer-content"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={stagger(0.1)}
                >
                    <motion.div className="footer-brand" variants={fadeUp}>
                        <a className="footer-logo" onClick={() => go('hero')}>
                            <span className="logo-bracket">&lt;</span>
                            <span className="logo-name"> {personalInfo.name.split(' ')[0]}</span>
                            <span className="logo-bracket"> / &gt;</span>
                        </a>
                        <p className="footer-tagline">{personalInfo.tagline}</p>
                    </motion.div>

                    <motion.div className="footer-links" variants={fadeUp}>
                        <h4 className="footer-links-title">Quick Links</h4>
                        <nav className="footer-nav">
                            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                                <a key={item} onClick={() => go(item.toLowerCase())} className="footer-link">
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </motion.div>

                    <motion.div className="footer-connect" variants={fadeUp}>
                        <h4 className="footer-links-title">Connect</h4>
                        <div className="footer-socials">
                            <motion.a
                                href={personalInfo.social.github}
                                target="_blank"
                                rel="noreferrer"
                                className="footer-social-icon"
                                aria-label="GitHub"
                                whileHover={{ y: -4, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaGithub size={18} />
                            </motion.a>
                            <motion.a
                                href={personalInfo.social.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="footer-social-icon"
                                aria-label="LinkedIn"
                                whileHover={{ y: -4, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaLinkedin size={18} />
                            </motion.a>
                            <motion.a
                                href={personalInfo.social.upwork}
                                target="_blank"
                                rel="noreferrer"
                                className="footer-social-icon"
                                aria-label="Upwork"
                                whileHover={{ y: -4, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <SiUpwork size={18} />
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="footer-bottom"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <p>
                        © {year} {personalInfo.name}. All rights reserved.
                    </p>
                    <p className="footer-made">
                        Made with{' '}
                        <motion.span
                            className="heart-wrap"
                            animate={{ scale: [1, 1.25, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <FaHeart className="heart-icon" />
                        </motion.span>{' '}
                        and React
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
