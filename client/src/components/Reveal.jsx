import { motion } from 'framer-motion';
import { fadeUp, scaleIn, slideIn, stagger, viewportOnce } from '../lib/motion';

/**
 * Scroll-triggered reveal with a handful of presets, so every section
 * enters the viewport with the same rhythm.
 *
 *   <Reveal delay={0.2}>...</Reveal>
 *   <Reveal variant="scale" whenInView={isVisible}>...</Reveal>
 */
const variants = {
    fade: fadeUp,
    scale: scaleIn,
    left: slideIn('left'),
    right: slideIn('right'),
    none: { hidden: { opacity: 0 }, show: { opacity: 1 } }
};

export default function Reveal({
    children,
    variant = 'fade',
    delay = 0,
    duration,
    as = 'div',
    className = '',
    viewport = viewportOnce,
    amount = 0.25,
    staggerChildren,
    ...rest
}) {
    const Tag = motion[as] ?? motion.div;
    const base = variants[variant] ?? fadeUp;

    const resolved = staggerChildren
        ? {
              hidden: base.hidden,
              show: {
                  ...base.show,
                  transition: {
                      ...base.show.transition,
                      staggerChildren,
                      delayChildren: delay
                  }
              }
          }
        : {
              hidden: base.hidden,
              show: {
                  ...base.show,
                  transition: {
                      ...base.show.transition,
                      delay,
                      ...(duration ? { duration } : {})
                  }
              }
          };

    return (
        <Tag
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ ...viewport, amount }}
            variants={resolved}
            {...rest}
        >
            {children}
        </Tag>
    );
}

/** Staggered parent — give children their own `variants={fadeUp}`. */
export function RevealGroup({ children, className = '', delay = 0, staggerChildren = 0.1, ...rest }) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={stagger(staggerChildren, delay)}
            {...rest}
        >
            {children}
        </motion.div>
    );
}
