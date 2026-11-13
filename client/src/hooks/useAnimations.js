import { useEffect, useMemo, useRef, useState } from 'react';
import {
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
    useScroll
} from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenis } from '../lib/scroll';
/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */

export function useScrollReveal(threshold = 0.15) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        const current = ref.current;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [threshold]);

    return [ref, isVisible];
}

/* ------------------------------------------------------------------ */
/* Typewriter                                                          */
/* ------------------------------------------------------------------ */

export function useTypewriter(texts, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
    const [displayText, setDisplayText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[textIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setDisplayText(currentText.substring(0, displayText.length + 1));
                if (displayText === currentText) {
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                setDisplayText(currentText.substring(0, displayText.length - 1));
                if (displayText === '') {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

    return displayText;
}

/* ------------------------------------------------------------------ */
/* Media query                                                         */
/* ------------------------------------------------------------------ */

/** SSR-safe media query subscription. */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia(query).matches : false
    );

    useEffect(() => {
        const mql = window.matchMedia(query);
        // Initial value is read during render; this listener only
        // tracks subsequent changes to the environment.
        const onChange = (e) => setMatches(e.matches);
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, [query]);

    return matches;
}

/* ------------------------------------------------------------------ */
/* Smooth scrolling (Lenis)                                           */
/* ------------------------------------------------------------------ */

/**
 * Anchors the whole page to Lenis so wheel/touch scrolling feels
 * weighted and cinematic. Automatically skipped for reduced motion.
 */
export function useSmoothScroll() {
    const reduced = useReducedMotion();

    useEffect(() => {
        if (reduced) return;

        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.6
        });

        setLenis(lenis);

        let frame;
        const raf = (time) => {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frame);
            lenis.destroy();
            setLenis(null);
        };
    }, [reduced]);
}

/* ------------------------------------------------------------------ */
/* Parallax                                                            */
/* ------------------------------------------------------------------ */

/**
 * Scroll-linked vertical offset for decorative layers.
 * Returns a MotionValue meant to be passed straight to `style.y`.
 */
export function useParallax(ref, distance = 120) {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });
    return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
}

/** Pointer-following offset for background orbs / floating decor. */
export function useMouseParallax(strength = 24) {
    const reduced = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const spring = { stiffness: 40, damping: 20, mass: 0.6 };
    const sx = useSpring(x, spring);
    const sy = useSpring(y, spring);

    useEffect(() => {
        if (reduced) return;

        const onMove = (e) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            x.set(((e.clientX - cx) / cx) * strength);
            y.set(((e.clientY - cy) / cy) * strength);
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
    }, [reduced, strength, x, y]);

    return { x: sx, y: sy };
}

/* ------------------------------------------------------------------ */
/* Count up                                                            */
/* ------------------------------------------------------------------ */

/**
 * Animates a numeric stat ("3+", "99%") from 0 to its value once
 * `active` flips true. Returns the formatted display string.
 */
export function useCountUp(target, active, duration = 1600) {
    const reduced = useReducedMotion();

    const numeric = parseFloat(String(target).replace(/[^\d.]/g, '')) || 0;
    const prefix = String(target).match(/^[^\d.]*/)?.[0] ?? '';
    const suffix = String(target).match(/[^\d.]*$/)?.[0] ?? '';

    // Seed the final value up front for reduced motion so no effect
    // has to push state after mount.
    const [value, setValue] = useState(() => (reduced ? numeric : 0));

    useEffect(() => {
        if (!active || reduced) return;

        let frame;
        const start = performance.now();

        const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            // easeOutExpo — fast start, graceful settle
            const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            setValue(numeric * eased);
            if (t < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [active, numeric, duration, reduced]);

    const rounded = Number.isInteger(numeric)
        ? Math.round(value)
        : value.toFixed(1);

    return `${prefix}${rounded}${suffix}`;
}

/* ------------------------------------------------------------------ */
/* 3D tilt                                                             */
/* ------------------------------------------------------------------ */

/**
 * Pointer-driven 3D tilt for cards. Returns props to spread onto a
 * motion element: ref + style (rotateX/rotateY/transformPerspective).
 */
export function useTilt(maxDeg = 8) {
    const ref = useRef(null);
    const reduced = useReducedMotion();

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const spring = { stiffness: 150, damping: 18, mass: 0.5 };
    const sRotateX = useSpring(rotateX, spring);
    const sRotateY = useSpring(rotateY, spring);

    useEffect(() => {
        const el = ref.current;
        if (!el || reduced) return;

        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            rotateY.set((px - 0.5) * maxDeg * 2);
            rotateX.set((0.5 - py) * maxDeg * 2);
        };

        const onLeave = () => {
            rotateX.set(0);
            rotateY.set(0);
        };

        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        return () => {
            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerleave', onLeave);
        };
    }, [maxDeg, reduced, rotateX, rotateY]);

    // Returned as one spreadable props bag so callers never read a ref
    // while rendering ({...tiltProps}).
    return useMemo(() => ({
        ref,
        style: {
            rotateX: sRotateX,
            rotateY: sRotateY,
            transformPerspective: 900
        }
    }), [ref, sRotateX, sRotateY]);
}

/* ------------------------------------------------------------------ */
/* Magnetic hover                                                      */
/* ------------------------------------------------------------------ */

/**
 * Element drifts toward the cursor while hovered and springs back on
 * leave — the classic awwwards button feel.
 */
export function useMagnetic(strength = 0.35) {
    const ref = useRef(null);
    const reduced = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

    useEffect(() => {
        const el = ref.current;
        if (!el || reduced) return;

        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
            y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
        };

        const onLeave = () => {
            x.set(0);
            y.set(0);
        };

        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        return () => {
            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerleave', onLeave);
        };
    }, [strength, reduced, x, y]);

    return useMemo(() => ({
        ref,
        style: { x: sx, y: sy }
    }), [ref, sx, sy]);
}

/* ------------------------------------------------------------------ */
/* Text reveal helper                                                  */
/* ------------------------------------------------------------------ */

/**
 * Reveals a block of copy word-by-word as it scrolls into view.
 * Returns a container variant + per-word variant for staggerChildren.
 */
export function useWordReveal(delay = 0) {
    return {
        container: {
            hidden: {},
            show: { transition: { staggerChildren: 0.03, delayChildren: delay } }
        },
        word: {
            hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
            show: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }
        }
    };
}
