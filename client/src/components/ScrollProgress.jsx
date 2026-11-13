import { motion, useScroll, useSpring } from 'framer-motion';
import './ScrollProgress.css';

/**
 * Thin gradient bar pinned to the very top of the viewport that fills
 * as the page is read — the "how much story is left" signal.
 */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="scroll-progress"
            style={{ scaleX }}
            aria-hidden="true"
        />
    );
}
