// Lenis-aware scrolling helpers. Falls back to native smooth scroll
// when the smooth scroller isn't running (e.g. reduced motion).

let lenis = null;

export function setLenis(instance) {
    lenis = instance;
}

export function stopScroll() {
    lenis?.stop();
    document.body.style.overflow = 'hidden';
}

export function startScroll() {
    lenis?.start();
    document.body.style.overflow = '';
}

/** Smoothly scroll to a section id, accounting for the fixed navbar. */
export function scrollToId(id, offset = -70) {
    const el = document.getElementById(id);
    if (!el) return;

    if (lenis) {
        lenis.scrollTo(el, { offset, duration: 1.4 });
    } else {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}
