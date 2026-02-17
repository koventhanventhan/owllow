import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Smartphone,
    Search,
    Cpu,
    Palette,
    Monitor,
    Layers,
    Megaphone,
    ShoppingBag,
    ArrowRight
} from 'lucide-react';
import { getServices, getProjects, getTestimonials, Service, Project, Testimonial } from '../api/client';
import Counter from '../components/Counter';
import './Home.css';

const Home = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [splineFailed, setSplineFailed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, projectsRes, testimonialsRes] = await Promise.all([
                    getServices(),
                    getProjects(true),
                    getTestimonials(),
                ]);
                setServices(servicesRes.data);
                setProjects(projectsRes.data);
                setTestimonials(testimonialsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

        // Listen for Spline load event
        const viewer = document.querySelector('spline-viewer');
        const handleLoad = () => {
            console.log('Spline loaded successfully');
            setIsSplineLoaded(true);
            setSplineFailed(false);
        };

        if (viewer) {
            viewer.addEventListener('load-complete', handleLoad);
        }

        // Failure Fallback: if not loaded after 15 seconds, show fallback
        // Increased to 15s for slower mobile GPUs
        const failureTimeout = setTimeout(() => {
            const currentViewer = document.querySelector('spline-viewer');
            if (currentViewer && !currentViewer.shadowRoot?.querySelector('canvas')) {
                console.log('Spline failed to load in time, showing fallback');
                setSplineFailed(true);
                setIsSplineLoaded(false);
            }
        }, 15000);

        // Hack to remove Spline Logo and optimize for mobile
        const interval = setInterval(() => {
            const viewer = document.querySelector('spline-viewer');
            if (viewer && viewer.shadowRoot) {
                const logo = viewer.shadowRoot.querySelector('#logo');
                if (logo) {
                    (logo as HTMLElement).style.display = 'none';
                }

                // Limit pixel ratio for mobile performance
                const canvas = viewer.shadowRoot.querySelector('canvas');
                if (canvas && window.innerWidth < 768) {
                    // Try to throttle pixel ratio if possible via attributes or direct canvas manipulation
                    // Spline-viewer doesn't easily expose renderer settings, but eager loading helps.
                }
            }
        }, 500);

        return () => {
            clearInterval(interval);
            clearTimeout(failureTimeout);
            if (viewer) {
                viewer.removeEventListener('load-complete', handleLoad);
            }
        };
    }, []);

    const stats = [
        { value: 50, suffix: '+', label: 'Active Projects' },
        { value: 100, suffix: '+', label: 'Satisfied Clients' },
        { value: 10, suffix: '+', label: 'Countries' },
    ];

    const whyChooseUs = [
        { title: 'Dedicated Team', description: 'We assign a dedicated team of professionals to work exclusively on your project.' },
        { title: 'Expertise Across Platforms', description: 'From custom websites to mobile apps and enterprise software, our team delivers innovative solutions.' },
        { title: 'Quality & Reliability', description: 'With a focus on performance, design, and security, we ensure our solutions are future-proof.' },
        { title: 'Innovative Solutions', description: 'Innovation is at the core of everything we do. We take a creative approach to problem-solving.' },
    ];

    const defaultServices = [
        { id: 1, title: 'Web Development', description: 'Create tailored websites to showcase your business online effectively.', iconComponent: <Monitor /> },
        { id: 2, title: 'Mobile App Development', description: 'Build user-friendly apps that offer smooth navigation and enhance user experience.', iconComponent: <Smartphone /> },
        { id: 3, title: 'SEO', description: 'Improve site ranking, traffic, and sales through expert search engine optimization.', iconComponent: <Search /> },
        { id: 4, title: 'Digital Marketing', description: 'Promote brands of all sizes with strategies that expand reach and visibility.', iconComponent: <Megaphone /> },
        { id: 5, title: 'Full Stack Development', description: 'Frontend and backend design, creating complete, functional web and mobile applications.', iconComponent: <Layers /> },
        { id: 6, title: 'IoT', description: 'Connect devices and digital services to deliver innovative web-based solutions.', iconComponent: <Cpu /> },
        { id: 7, title: 'Graphic Design', description: 'Enhance branding with visually appealing and professional graphic designs.', iconComponent: <Palette /> },
        { id: 8, title: 'E-Commerce', description: 'Develop digital stores and platforms to boost online business operations.', iconComponent: <ShoppingBag /> },
    ];

    const displayServices = services.length > 0 ? services : defaultServices;

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            "We are one of the leading software companies"
                        </h1>
                        <p className="hero-description">
                            Owllow is one of the leading software companies specializing in Web & Mobile App Development and Digital Marketing. With a passionate team of skilled professionals, we are committed to delivering innovative, high-performance, and customized digital solutions.
                        </p>
                        <div className="hero-actions">
                            <Link to="/projects" className="btn-primary">See Portfolio</Link>
                            <Link to="/contact" className="btn-secondary">Contact Us</Link>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className={`spline-container ${isSplineLoaded ? 'loaded' : ''}`}>
                            {/* Persistent Static Background (Shows immediately) */}
                            {!isSplineLoaded && !splineFailed && (
                                <div className="robot-static-bg">
                                    <div className="static-glow"></div>
                                    <div className="static-fallback-icon">
                                        <Cpu size={140} strokeWidth={1} />
                                    </div>
                                    <div className="spline-loading">
                                        <div className="loader-ring"></div>
                                        <span>" Owllow AI Is Loading "</span>
                                    </div>
                                </div>
                            )}

                            {splineFailed ? (
                                <div className="spline-fallback">
                                    <div className="fallback-glow"></div>
                                    <Cpu size={120} className="fallback-icon" />
                                    <span>3D Experience Unavailable</span>
                                </div>
                            ) : (
                                <div
                                    className="spline-viewer-wrapper"
                                    dangerouslySetInnerHTML={{
                                        __html: '<spline-viewer url="https://prod.spline.design/SFCrgthTAoKRNdfv/scene.splinecode" loading-type="eager" loading="eager" events-target="global"></spline-viewer>'
                                    }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="hero-stats">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <span className="stat-number">
                                <Counter end={stat.value} suffix={stat.suffix} />
                            </span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <div className="section-container">
                    <h2 className="section-title">Our Services</h2>
                    <div className="services-grid">
                        {displayServices.map((service: any) => (
                            <div key={service.id} className="service-card">
                                <span className="service-icon">
                                    {service.iconComponent || <Monitor />}
                                </span>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <div className="service-link">
                                    <span>Learn More</span>
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-section">
                <div className="section-container">
                    <div className="why-content">
                        <h2>Hire us today to take your business to the next level!</h2>
                        <p>
                            We are one of the leading software companies, not just another service provider but your trusted digital partner. Our passionate team is dedicated to more than just building websites or mobile apps. We create custom digital experiences that truly represent your brand.
                        </p>
                    </div>
                    <div className="why-grid">
                        {whyChooseUs.map((item, index) => (
                            <div key={index} className="why-card">
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="projects-section">
                <div className="section-container">
                    <h2 className="section-title">Featured Projects</h2>
                    <div className="projects-grid">
                        {projects.length > 0 ? (
                            projects.slice(0, 6).map((project) => (
                                <div key={project.id} className="project-card">
                                    <div className="project-image">
                                        {project.image ? (
                                            <img src={project.image} alt={project.title} />
                                        ) : (
                                            <div className="project-placeholder">🚀</div>
                                        )}
                                    </div>
                                    <h4>{project.title}</h4>
                                    {project.client_name && <span className="client-name">{project.client_name}</span>}
                                </div>
                            ))
                        ) : (
                            <p className="no-data">Projects coming soon...</p>
                        )}
                    </div>
                    <Link to="/projects" className="view-more">View All Projects</Link>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="section-container">
                    <h2 className="section-title">What Our Clients Say</h2>
                    <div className="testimonials-grid">
                        {testimonials.length > 0 ? (
                            testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="testimonial-card">
                                    <p className="testimonial-content">"{testimonial.content}"</p>
                                    <div className="testimonial-author">
                                        <strong>{testimonial.client_name}</strong>
                                        {testimonial.client_title && <span>{testimonial.client_title}</span>}
                                        {testimonial.company && <span>{testimonial.company}</span>}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="testimonial-card">
                                <p className="testimonial-content">"Owllow stands out as the premier web designing and web development company. My overall experience exceeded expectations."</p>
                                <div className="testimonial-author">
                                    <strong>Happy Client</strong>
                                    <span>CEO, Tech Company</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="section-container">
                    <h2>Is Your Website Design Not Converting Visitors Into Customers?</h2>
                    <p>Your website is your online identity. As a leading web design company, we provide top-quality website design services worldwide.</p>
                    <Link to="/contact" className="btn-primary">Contact Us</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;