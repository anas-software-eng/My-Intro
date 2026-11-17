import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Marquee from './components/Marquee';
import { useSmoothScroll } from './hooks/useAnimations';

const MARQUEE_STACK = [
    'React', 'Node.js', 'TypeScript', 'MongoDB', 'Express.js',
    'TailwindCSS', 'Python', 'Figma'
];

const MARQUEE_SERVICES = [
    'Full Stack Development', 'API Design', 'UI/UX Implementation',
     'Database Architecture'
];

function App() {
    const [introDone, setIntroDone] = useState(false);
    const handleIntroDone = useCallback(() => setIntroDone(true), []);
    useSmoothScroll();

    return (
        <>
            <Preloader onComplete={handleIntroDone} />
            <Cursor />
            <ScrollProgress />
            <Navbar introDone={introDone} />
            <main>
                <Hero introDone={introDone} />
                <About />
                <Marquee items={MARQUEE_STACK} />
                <Skills />
                <Projects />
                <Marquee items={MARQUEE_SERVICES} reverse outline />
                <Experience />
                {/* <Testimonials /> */}
                <Contact />
            </main>
            <Footer />
        </>
    );
}

export default App;
