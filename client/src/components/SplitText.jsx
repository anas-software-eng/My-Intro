import { motion } from 'framer-motion';
import { buildWords } from '../lib/text';

const wordVariant = {
    hidden: { y: '110%', opacity: 0 },
    show: {
        y: '0%',
        opacity: 1,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

const containerVariant = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
};

/**
 * Kinetic headline: each word sits in an overflow mask and rises into
 * place. `highlight` marks the phrase that gets the gradient treatment.
 *
 *   <SplitText text="Featured Projects" highlight="Projects" />
 */
export default function SplitText({
    text,
    highlight,
    as: Tag = 'span',
    className = '',
    once = true,
    play
}) {
    const words = buildWords(text, highlight);

    // `play` drives the reveal from a boolean (e.g. intro completion)
    // instead of viewport entry.
    const trigger = play === undefined
        ? { initial: 'hidden', whileInView: 'show', viewport: { once, margin: '-60px' } }
        : { initial: 'hidden', animate: play ? 'show' : 'hidden' };

    return (
        <Tag className={`split-text ${className}`.trim()}>
            <motion.span
                className="split-text-inner"
                {...trigger}
                variants={containerVariant}
            >
                {words.map((word, i) => (
                    <span
                        key={`${word.text}-${i}`}
                        className="split-word"
                    >
                        <motion.span
                            className={`split-word-mask ${word.gradient ? 'gradient-text' : ''}`.trim()}
                            variants={wordVariant}
                        >
                            {word.text}
                        </motion.span>
                        {i < words.length - 1 && '\u00A0'}
                    </span>
                ))}
            </motion.span>
        </Tag>
    );
}
