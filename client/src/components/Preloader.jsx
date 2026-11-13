import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import { stopScroll, startScroll } from '../lib/scroll';
import './Preloader.css';

const COUNT_DURATION = 2000;

/**
 * Cinematic intro: percentage counter + masked name reveal, then the
 * curtain lifts to hand the page over to the hero.
 */
export default function Preloader({ onComplete }) {
    const reduced = useReducedMotion();
    // Reduced motion skips straight to the finished state — no effect
    // needs to push that state after mount.
    const [progress, setProgress] = useState(() => (reduced ? 100 : 0));
    const [done, setDone] = useState(() => Boolean(reduced));

    // Lock scrolling while the intro plays.
    useEffect(() => {
        stopScroll();
        return () => startScroll();
    }, []);

    // Drive the counter.
    useEffect(() => {
        if (reduced) return;

        let frame;
        const start = performance.now();

        const tick = (now) => {
            const t = Math.min((now - start) / COUNT_DURATION, 1);
            // easeOutCubic — races then settles on 100
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(Math.round(eased * 100));

            if (t < 1) {
                frame = requestAnimationFrame(tick);
            } else {
                setTimeout(() => setDone(true), 250);
            }
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [reduced]);

    // Hand over to the page once the curtain is gone.
    useEffect(() => {
        if (!done) return;
        const timer = setTimeout(() => {
            startScroll();
            onComplete?.();
        }, reduced ? 0 : 900);
        return () => clearTimeout(timer);
    }, [done, reduced, onComplete]);

    const firstName = personalInfo.name.split(' ')[0];
    const lastName = personalInfo.name.split(' ')[1] ?? '';

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="preloader"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="preloader-inner">
                        <div className="preloader-name">
                            {[...firstName].map((char, i) => (
                                <motion.span
                                    key={`f-${i}`}
                                    className="preloader-char"
                                    initial={{ y: '110%' }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.1 + i * 0.05,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            <span className="preloader-space" />
                            {[...lastName].map((char, i) => (
                                <motion.span
                                    key={`l-${i}`}
                                    className="preloader-char preloader-char-accent"
                                    initial={{ y: '110%' }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.25 + i * 0.05,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>

                        <div className="preloader-meta">
                            <span className="preloader-role">{personalInfo.title}</span>
                            <span className="preloader-count">
                                {String(progress).padStart(3, '0')}
                            </span>
                        </div>

                        <div className="preloader-bar">
                            <motion.div
                                className="preloader-bar-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
