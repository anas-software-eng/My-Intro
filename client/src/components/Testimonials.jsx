import { useState } from 'react';
import { testimonials } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useAnimations';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Testimonials.css';

export default function Testimonials() {
    const [ref, isVisible] = useScrollReveal();
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="testimonials" id="testimonials" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Testimonials</span>
                    <h2 className="section-title">
                        What Clients{' '}
                        <span className="gradient-text">Say</span>
                    </h2>
                </motion.div>

                <div className="testimonial-wrapper">
                    <button className="testimonial-nav testimonial-prev" onClick={prev} aria-label="Previous">
                        <FaChevronLeft size={16} />
                    </button>

                    <div className="testimonial-container">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                className="testimonial-card glass-card"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                <FaQuoteLeft className="quote-icon" size={32} />
                                <p className="testimonial-text">{testimonials[current].text}</p>
                                <div className="testimonial-rating">
                                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                                        <FaStar key={i} className="star-icon" />
                                    ))}
                                </div>
                                <div className="testimonial-author">
                                    <div className="author-avatar">
                                        {testimonials[current].name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="author-name">{testimonials[current].name}</h4>
                                        <span className="author-role">{testimonials[current].role}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button className="testimonial-nav testimonial-next" onClick={next} aria-label="Next">
                        <FaChevronRight size={16} />
                    </button>
                </div>

                <div className="testimonial-dots">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            className={`dot ${i === current ? 'active' : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
