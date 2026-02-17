import { useState } from 'react';
import {
    MapPin,
    Mail,
    Phone,
    Facebook,
    Instagram,
    Linkedin,
    MessageCircle
} from 'lucide-react';
import { submitContact, getSettings, ContactForm as ContactFormData } from '../api/client';
import { useEffect } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [settings, setSettings] = useState<Record<string, string>>({});

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await submitContact(formData);
            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <h1>Contact Us</h1>
                <p>Let's discuss how we can help your business grow</p>
            </section>

            <section className="contact-content">
                <div className="contact-container">
                    <div className="contact-info">
                        <h2>Get Started With [ Owllow ]</h2>
                        <p>Would you like to discuss your project with our experts? We're here to help!</p>

                        <div className="info-items">
                            <div className="info-item">
                                <span className="info-icon"><MapPin size={24} /></span>
                                <div>
                                    <h4>Address</h4>
                                    <p>{settings.address || 'Your Business Location'}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-icon"><Mail size={24} /></span>
                                <div>
                                    <h4>Email</h4>
                                    <a href={`mailto:${settings.email || 'info@owllow.com'}`}>{settings.email || 'info@owllow.com'}</a>
                                    {settings.career_email && <a href={`mailto:${settings.career_email}`}>{settings.career_email}</a>}
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-icon"><Phone size={24} /></span>
                                <div>
                                    <h4>Phone</h4>
                                    <a href={`tel:${settings.phone || '+1234567890'}`}>{settings.phone || '+1 234 567 890'}</a>
                                </div>
                            </div>
                        </div>

                        <div className="social-links">
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

                    <div className="contact-form-container">
                        <h2>Send Us a Message</h2>

                        {success ? (
                            <div className="success-message">
                                <span>✓</span>
                                <p>Thank you for contacting us! We will get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                {error && <div className="error-message">{error}</div>}

                                <div className="form-row">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name *"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Your Email *"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <textarea
                                        name="message"
                                        placeholder="Your Message *"
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
