import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSettings } from '../api/client';
import './Footer.css';

const Footer = () => {
    const [settings, setSettings] = useState<Record<string, string>>({
        site_name: 'Owllow',
        facebook: 'https://facebook.com/ollow',
        instagram: 'https://instagram.com/ollow',
        linkedin: 'https://linkedin.com/company/ollow',
        whatsapp: '+919876543210',
        email: 'contact@ollow.com'
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await getSettings();
                if (response.data && Object.keys(response.data).length > 0) {
                    setSettings(prev => ({ ...prev, ...response.data }));
                }
            } catch (err) {
                console.error('Error fetching settings:', err);
            }
        };
        fetchSettings();
    }, []);

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <div className="logo-icon-wrapper">
                                <img src="/venthan.png" alt="Owllow" className="footer-logo-img-venthan" />
                            </div>
                            <span className="logo-text">{settings.site_name || 'Owllow'}</span>
                        </Link>
                        <p className="footer-tagline">
                            We are one of the leading software companies, specializing in web and app development as well as digital marketing.
                        </p>
                        <div className="footer-social">
                            {settings.facebook && (
                                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <Facebook size={20} />
                                </a>
                            )}
                            {settings.instagram && (
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <Instagram size={20} />
                                </a>
                            )}
                            {settings.linkedin && (
                                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <Linkedin size={20} />
                                </a>
                            )}
                            {settings.whatsapp && (
                                <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                    <MessageCircle size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <Link to="/">Home</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/blogs">Blogs</Link>
                        <Link to="/contact">Contact Us</Link>
                    </div>

                    <div className="footer-services">
                        <h4>Services</h4>
                        <span>Web Development</span>
                        <span>Mobile App Development</span>
                        <span>Digital Marketing</span>
                        <span>UI/UX Design</span>
                        <span>SEO Optimization</span>
                    </div>

                    <div className="footer-contact">
                        <h4>Let's Build Something Together</h4>
                        <p>Interested in working with us?</p>
                        <a href={`mailto:${settings.email || 'info@ollow.com'}`} className="footer-email">{settings.email || 'info@ollow.com'}</a>
                        {settings.career_email && <a href={`mailto:${settings.career_email}`} className="footer-email">{settings.career_email}</a>}
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; Copyright {new Date().getFullYear()}. {settings.site_name || 'Owllow'} All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
