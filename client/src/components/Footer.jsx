import { personalInfo } from '../data/portfolio';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import './Footer.css';

export default function Footer() {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <a className="footer-logo" onClick={() => scrollTo('hero')}>
                            <span className="logo-bracket">&lt;</span>
                            <span className="logo-name"> {personalInfo.name.split(' ')[0]}</span>
                            <span className="logo-bracket"> / &gt;</span>
                        </a>
                        <p className="footer-tagline">{personalInfo.tagline}</p>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-links-title">Quick Links</h4>
                        <nav className="footer-nav">
                            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                                <a key={item} onClick={() => scrollTo(item.toLowerCase())} className="footer-link">
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="footer-connect">
                        <h4 className="footer-links-title">Connect</h4>
                        <div className="footer-socials">
                            <a href={personalInfo.social.github} target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="GitHub">
                                <FaGithub size={18} />
                            </a>
                            <a href={personalInfo.social.linkedin} target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="LinkedIn">
                                <FaLinkedin size={18} />
                            </a>
                            <a href={personalInfo.social.upwork} target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Upwork">
                                <SiUpwork size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {year} {personalInfo.name}. All rights reserved.
                    </p>
                    <p className="footer-made">
                        Made with <FaHeart className="heart-icon" /> and React
                    </p>
                </div>
            </div>
        </footer>
    );
}
