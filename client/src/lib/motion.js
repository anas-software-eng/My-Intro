// Shared easing + motion variants used across the portfolio.

export const EASE = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

/** Simple fade + rise, the workhorse reveal. */
export const fadeUp = {
    hidden: { opacity: 0, y: 34 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.92, y: 24 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Slide in from the side — direction depends on which side the element lives on. */
export const slideIn = (from = 'left') => ({
    hidden: { opacity: 0, x: from === 'left' ? -48 : 48 },
    show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
});

/** Parent container that staggers its variant children. */
export const stagger = (staggerChildren = 0.09, delayChildren = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
});

/** Shared viewport config — reveal once, slightly before fully visible. */
export const viewportOnce = { once: true, margin: '-80px' };
