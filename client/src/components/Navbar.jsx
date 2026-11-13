import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolio';
import { scrollToId } from '../lib/scroll';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
];

export default function Navbar({ introDone = true }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = navLinks.map(l => l.id);
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 150) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const go = (id) => {
        scrollToId(id);
        setIsMobileOpen(false);
    };

    return (
        <motion.nav
            className={`navbar ${isScrolled ? 'scrolled' : ''}`}
            id="navbar"
            initial={{ y: -90, opacity: 0 }}
            animate={introDone ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="navbar-container container">
                <a className="navbar-logo" onClick={() => go('hero')}>
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-name"> {personalInfo.name.split(' ')[0]}</span>
                    <span className="logo-bracket"> / &gt;</span>
                </a>

                <div className={`navbar-links ${isMobileOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                            onClick={() => go(link.id)}
                        >
                            {link.label}
                            <AnimatePresence>
                                {activeSection === link.id && (
                                    <motion.span
                                        className="nav-indicator"
                                        layoutId="nav-indicator"
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        exit={{ opacity: 0, scaleX: 0 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                    />
                                )}
                            </AnimatePresence>
                        </a>
                    ))}
                    <a href={personalInfo.resumeUrl} className="btn btn-primary nav-cta" download rel="noreferrer">
                        <FaDownload size={14} />
                        Resume
                    </a>
                </div>

                <button
                    className="mobile-toggle"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>
            </div>
        </motion.nav>
    );
}
