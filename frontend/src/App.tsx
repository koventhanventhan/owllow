import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
            </div>
            {/* Global SVG Gradients for Icons */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#da1a07', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#e63946', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
            </svg>
        </BrowserRouter>
    );
}

export default App;
