import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { getSettings } from '../api/client';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [settings, setSettings] = useState<Record<string, string>>({});
    const location = useLocation();

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await getSettings();
                setSettings(response.data);
            } catch (err) {
                console.error('Error fetching settings:', err);
            }
        };
        fetchSettings();
    }, []);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About Us' },
        { path: '/services', label: 'Services' },
        { path: '/projects', label: 'Projects' },
        { path: '/blogs', label: 'Blogs' },
        { path: '/contact', label: 'Contact Us' },
    ];

    return (
        <header className={`header ${isMenuOpen ? 'is-nav-open' : ''}`}>
            <div className="header-container">
                <Link to="/" className="logo">
                    <div className="logo-icon-wrapper">
                        <img src="/venthan.png" alt="Owllow" className="logo-img-venthan" />
                    </div>
                    <span className="logo-text">{settings.site_name || 'Owllow'}</span>
                </Link>

                <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Mobile Only: Social Links and CTA */}
                    <div className="mobile-menu-extras">
                        <div className="social-bar-mobile">
                            {settings.facebook && (
                                <a href={settings.facebook} target="_blank" rel="noopener noreferrer">
                                    <Facebook size={20} />
                                </a>
                            )}
                            {settings.instagram && (
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer">
                                    <Instagram size={20} />
                                </a>
                            )}
                            {settings.linkedin && (
                                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin size={20} />
                                </a>
                            )}
                            {settings.whatsapp && (
                                <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                                    <MessageCircle size={20} />
                                </a>
                            )}
                        </div>
                        {settings.whatsapp && (
                            <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} className="cta-button-mobile" onClick={() => setIsMenuOpen(false)}>
                                Contact Us
                            </a>
                        )}
                    </div>
                </nav>

                <div className="header-actions">
                    <div className="social-bar">
                        {settings.facebook && (
                            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <Facebook size={18} />
                            </a>
                        )}
                        {settings.instagram && (
                            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Instagram size={18} />
                            </a>
                        )}
                        {settings.linkedin && (
                            <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                        )}
                        {settings.whatsapp && (
                            <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <MessageCircle size={18} />
                            </a>
                        )}
                    </div>
                    {settings.whatsapp && (
                        <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} className="cta-button">
                            Contact Us
                        </a>
                    )}
                    <button
                        className="menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
