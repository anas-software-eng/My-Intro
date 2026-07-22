import { useState } from 'react';
import { projects } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useAnimations';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

export default function Projects() {
    const [ref, isVisible] = useScrollReveal();
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { key: 'all', label: 'All Projects' },
        { key: 'fullstack', label: 'Full Stack' },
        { key: 'frontend', label: 'Frontend' },
        { key: 'backend', label: 'Backend' }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section className="projects" id="projects" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Portfolio</span>
                    <h2 className="section-title">
                        Featured{' '}
                        <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        A selection of projects that showcase my skills, creativity, and problem-solving abilities
                    </p>
                </motion.div>

                <div className="projects-filters">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <motion.div className="projects-grid" layout>
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                className="project-card glass-card"
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div
                                    className="project-header"
                                    style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)` }}
                                >
                                    <div className="project-color-bar" style={{ background: project.color }} />
                                    <span className="project-subtitle">{project.subtitle}</span>
                                    <h3 className="project-title">{project.title}</h3>
                                </div>

                                <div className="project-body">
                                    <p className="project-description">{project.description}</p>

                                    <div className="project-features">
                                        {project.features.map((f, i) => (
                                            <span key={i} className="feature-tag">
                                                {f}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="project-tech">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="tech-tag">{t}</span>
                                        ))}
                                    </div>

                                    <div className="project-links">
                                        <a href={project.github} className="project-link" target="_blank" rel="noreferrer">
                                            <FaGithub size={16} />
                                            Source Code
                                        </a>
                                        <a href={project.live} className="project-link project-link-primary" target="_blank" rel="noreferrer">
                                            <FaExternalLinkAlt size={14} />
                                            Live Demo
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
