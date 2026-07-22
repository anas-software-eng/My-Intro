import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolio';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    const navLinks = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'experience', label: 'Experience' },
        { id: 'contact', label: 'Contact' }
    ];

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

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileOpen(false);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="navbar-container container">
                <a className="navbar-logo" onClick={() => scrollTo('hero')}>
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-name"> {personalInfo.name.split(' ')[0]}</span>
                    <span className="logo-bracket"> / &gt;</span>
                </a>

                <div className={`navbar-links ${isMobileOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                            onClick={() => scrollTo(link.id)}
                        >
                            {link.label}
                            {activeSection === link.id && <span className="nav-indicator" />}
                        </a>
                    ))}
                    <a href={personalInfo.resumeUrl} className="btn btn-primary nav-cta" download rel="noreferrer">
                        <FaDownload size={14} />
                        Resume
                    </a>
                </div>

                <button className="mobile-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                    {isMobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>
            </div>
        </nav>
    );
}
