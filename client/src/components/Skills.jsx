import { useState } from 'react';
import { skills } from '../data/portfolio';
import { useScrollReveal, useCountUp, useTilt } from '../hooks/useAnimations';
import { fadeUp, stagger } from '../lib/motion';
import SplitText from './SplitText';
import Reveal from './Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import './Skills.css';

function SkillCard({ skill, active }) {
    const Icon = skill.icon;
    const level = useCountUp(`${skill.level}%`, active, 1400);
    const tilt = useTilt(10);

    return (
        <motion.div
            className="skill-card glass-card"
            {...tilt}
            variants={fadeUp}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
            layout
        >
            <div className="skill-icon-wrapper">
                <Icon size={28} />
            </div>
            <span className="skill-name">{skill.name}</span>
            <div className="skill-bar-container">
                <motion.div
                    className="skill-bar"
                    initial={{ width: 0 }}
                    animate={{ width: active ? `${skill.level}%` : 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
            {/* <span className="skill-level">{level}</span> */}
        </motion.div>
    );
}

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
                <div className="section-header">
                    <Reveal variant="fade">
                        <span className="section-label">My Skills</span>
                    </Reveal>
                    <SplitText
                        text="Technologies I Work With"
                        highlight="Work With"
                        as="h2"
                        className="section-title"
                    />
                    <Reveal variant="fade" delay={0.25}>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            Constantly learning and adapting to the latest technologies to deliver the best solutions
                        </p>
                    </Reveal>
                </div>

                <Reveal variant="scale" delay={0.1}>
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
                </Reveal>

                <motion.div
                    className="skills-grid"
                    initial="hidden"
                    animate={isVisible ? 'show' : 'hidden'}
                    variants={stagger(0.07)}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map((skill) => (
                            <SkillCard key={skill.name} skill={skill} active={isVisible} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
