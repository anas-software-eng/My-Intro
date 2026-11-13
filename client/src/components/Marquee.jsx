import { motion } from 'framer-motion';
import './Marquee.css';

/**
 * Infinite horizontal band of kinetic type used as a section divider.
 * Two rows drift in opposite directions and pause on hover.
 */
export default function Marquee({ items, reverse = false, outline = false }) {
    const row = (
        <div className="marquee-row">
            {[0, 1].map((copy) => (
                <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
                    {items.map((item, i) => (
                        <span className="marquee-item" key={`${copy}-${i}`}>
                            <span className={outline ? 'marquee-text marquee-text-outline' : 'marquee-text'}>
                                {item}
                            </span>
                            <span className="marquee-star">✦</span>
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );

    return (
        <motion.div
            className={`marquee ${reverse ? 'marquee-reverse' : ''}`.trim()}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            {row}
        </motion.div>
    );
}
