import {
    DollarSign,
    Lightbulb,
    Zap,
    ShieldCheck,
    TrendingUp,
    Award
} from 'lucide-react';
import './About.css';

const About = () => {
    const values = [
        { iconComponent: <DollarSign />, title: 'Cost-effective', description: 'Affordable solutions without compromising quality' },
        { iconComponent: <Lightbulb />, title: 'Innovation', description: 'Creative approaches to solve complex problems' },
        { iconComponent: <Zap />, title: 'Fast & Reliable', description: 'Quick turnaround with dependable results' },
        { iconComponent: <ShieldCheck />, title: 'Integrity', description: 'Honest and transparent in all dealings' },
        { iconComponent: <TrendingUp />, title: 'Performance', description: 'Optimized solutions for maximum efficiency' },
        { iconComponent: <Award />, title: 'Expertise', description: 'Years of experience across platforms' },
    ];

    return (
        <div className="about-page">
            <section className="about-hero">
                <h1>About Us</h1>
                <p>Your trusted digital partner for innovative solutions</p>
            </section>

            <section className="about-content">
                <div className="about-container">
                    <div className="about-story">
                        <h2>Our Story</h2>
                        <p>
                            Owllow is one of the leading software companies specializing in Web & Mobile App Development and Digital Marketing. With a passionate team of skilled professionals, we are committed to delivering innovative, high-performance, and customized digital solutions that empower businesses to thrive in the modern digital landscape.
                        </p>
                        <p>
                            At Owllow, we understand that every business is unique. That's why we offer tailored strategies and development services designed to meet your specific goals — whether it's building a powerful online presence, launching a mobile application, or executing a results-driven marketing campaign.
                        </p>
                        <p>
                            From startups to established enterprises, we have the experience and insight to help you scale your business efficiently and effectively. Our services are not only cost-effective but also geared towards long-term success and sustainability.
                        </p>
                    </div>

                    <div className="about-values">
                        <h2>How We Empower Your Business</h2>
                        <p className="values-subtitle">
                            The driving force of our growth is customer satisfaction. We will walk that extra mile and do anything it takes to raise your business to the top.
                        </p>
                        <div className="values-grid">
                            {values.map((value, index) => (
                                <div key={index} className="value-card">
                                    <span className="value-icon">
                                        {value.iconComponent}
                                    </span>
                                    <h4>{value.title}</h4>
                                    <p>{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="about-experience">
                        <div className="exp-item">
                            <span className="exp-number">3+</span>
                            <span className="exp-label">Years of Experience</span>
                        </div>
                        <div className="exp-item">
                            <span className="exp-number">100+</span>
                            <span className="exp-label">Satisfied Clients</span>
                        </div>
                        <div className="exp-item">
                            <span className="exp-number">50+</span>
                            <span className="exp-label">Active Projects</span>
                        </div>
                        <div className="exp-item">
                            <span className="exp-number">10+</span>
                            <span className="exp-label">Countries</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
