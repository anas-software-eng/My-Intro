import { useState } from 'react';
import { skills } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useAnimations';
import { motion } from 'framer-motion';
import './Skills.css';

export default function Skills() {
    const [ref, isVisible] = useScrollReveal();
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { key: 'all', label: 'All' },
        { key: 'frontend', label: 'Frontend' },
        { key: 'backend', label: 'Backend' },
        { key: 'tools', label: 'Tools' }
    ];

    const filteredSkills = activeFilter === 'all'
        ? skills
        : skills.filter(s => s.category === activeFilter);

    return (
        <section className="skills" id="skills" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">My Skills</span>
                    <h2 className="section-title">
                        Technologies I{' '}
                        <span className="gradient-text">Work With</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Constantly learning and adapting to the latest technologies to deliver the best solutions
                    </p>
                </motion.div>

                <div className="skills-filters">
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

                <motion.div
                    className="skills-grid"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {filteredSkills.map((skill, i) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={skill.name}
                                className="skill-card glass-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.1 * i }}
                                layout
                            >
                                <div className="skill-icon-wrapper">
                                    <Icon size={28} />
                                </div>
                                <span className="skill-name">{skill.name}</span>
                                <div className="skill-bar-container">
                                    <div
                                        className="skill-bar"
                                        style={{
                                            width: isVisible ? `${skill.level}%` : '0%',
                                            transitionDelay: `${0.5 + i * 0.1}s`
                                        }}
                                    />
                                </div>
                                <span className="skill-level">{skill.level}%</span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
