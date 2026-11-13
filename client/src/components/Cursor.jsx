import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useAnimations';
import './Cursor.css';

/**
 * Two-part cursor: a precise dot that tracks the pointer and a lagging
 * ring that grows over interactive elements. Hidden on touch devices
 * and for users who prefer reduced motion.
 */
export default function Cursor() {
    const reduced = useReducedMotion();
    const [hovering, setHovering] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [label, setLabel] = useState('');

    // Capability is a pure read of the environment — no state needed.
    const capable = useMediaQuery('(pointer: fine)');

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const ringX = useSpring(x, { stiffness: 250, damping: 25, mass: 0.6 });
    const ringY = useSpring(y, { stiffness: 250, damping: 25, mass: 0.6 });

    const enabled = capable && !reduced;

    useEffect(() => {
        if (!enabled) return;
        document.documentElement.classList.add('has-custom-cursor');

        const onMove = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);

            const target = e.target.closest('a, button, [data-cursor]');
            setHovering(Boolean(target));
            setLabel(target?.dataset?.cursor || '');
        };
        const onDown = () => setPressed(true);
        const onUp = () => setPressed(false);
        const onLeave = () => {
            x.set(-100);
            y.set(-100);
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerdown', onDown);
        window.addEventListener('pointerup', onUp);
        document.addEventListener('pointerleave', onLeave);

        return () => {
            document.documentElement.classList.remove('has-custom-cursor');
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
            document.removeEventListener('pointerleave', onLeave);
        };
    }, [enabled, x, y]);

    if (!enabled) return null;

    const ringSize = label ? 72 : hovering ? 52 : 36;

    return (
        <>
            <motion.div
                className="cursor-dot"
                style={{ x, y }}
                animate={{ scale: pressed ? 0.6 : 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            />
            <motion.div
                className="cursor-ring"
                style={{ x: ringX, y: ringY }}
                animate={{
                    width: ringSize,
                    height: ringSize,
                    opacity: hovering ? 1 : 0.5,
                    scale: pressed ? 0.9 : 1
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
                {label && <span className="cursor-label">{label}</span>}
            </motion.div>
        </>
    );
}
