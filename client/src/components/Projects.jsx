import { useState } from 'react';
import { projects } from '../data/portfolio';
import { useScrollReveal, useTilt } from '../hooks/useAnimations';
import { fadeUp, stagger } from '../lib/motion';
import SplitText from './SplitText';
import Reveal from './Reveal';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import './Projects.css';

function ProjectCard({ project }) {
    const tilt = useTilt(6);
    const [glow, setGlow] = useState(false);

    // Cursor position inside the card, used for the spotlight gradient.
    const mx = useMotionValue(-300);
    const my = useMotionValue(-300);
    const spotlight = useMotionTemplate`
        radial-gradient(420px circle at ${mx}px ${my}px,
            ${project.color}26, transparent 65%)
    `;

    const onPointerMove = (e) => {
        const rect = tilt.ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
    };

    return (
        <motion.article
            className={`project-card glass-card ${glow ? 'is-glowing' : ''}`.trim()}
            {...tilt}
            style={{ ...tilt.style, '--project-color': project.color }}
            variants={fadeUp}
            exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.25 } }}
            layout
            onPointerMove={onPointerMove}
            onPointerEnter={() => setGlow(true)}
            onPointerLeave={() => setGlow(false)}
            data-cursor="View"
        >
            <motion.div
                className="project-spotlight"
                style={{ background: spotlight }}
                aria-hidden="true"
            />

            <div
                className="project-header"
                style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)` }}
            >
                <motion.div
                    className="project-color-bar"
                    style={{ background: project.color }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="project-subtitle">{project.subtitle}</span>
                <h3 className="project-title">{project.title}</h3>
            </div>

            <div className="project-body">
                <p className="project-description">{project.description}</p>

                <div className="project-features">
                    {project.features.map((f, i) => (
                        <motion.span
                            key={i}
                            className="feature-tag"
                            initial={{ opacity: 0, scale: 0.7 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                        >
                            {f}
                        </motion.span>
                    ))}
                </div>

                <div className="project-tech">
                    {project.tech.map((t, i) => (
                        <span key={i} className="tech-tag">{t}</span>
                    ))}
                </div>

                <div className="project-links">
                    {project.github && (
                        <a href={project.github} className="project-link" target="_blank" rel="noreferrer">
                            <FaGithub size={16} />
                            Source Code
                        </a>
                    )}
                    {project.live && (
                        <a href={project.live} className="project-link project-link-primary" target="_blank" rel="noreferrer">
                            <FaExternalLinkAlt size={14} />
                            Visit Project
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

export default function Projects() {
    const [ref] = useScrollReveal();
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
                <div className="section-header">
                    <Reveal variant="fade">
                        <span className="section-label">Portfolio</span>
                    </Reveal>
                    <SplitText
                        text="Featured Projects"
                        highlight="Projects"
                        as="h2"
                        className="section-title"
                    />
                    <Reveal variant="fade" delay={0.25}>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            A selection of projects that showcase my skills, creativity, and problem-solving abilities
                        </p>
                    </Reveal>
                </div>

                <Reveal variant="scale" delay={0.1}>
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
                </Reveal>

                <motion.div
                    className="projects-grid"
                    layout
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={stagger(0.12)}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
