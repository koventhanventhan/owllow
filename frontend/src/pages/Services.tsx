import { useEffect, useState } from 'react';
import {
    Globe,
    Smartphone,
    Search,
    TrendingUp,
    Code,
    ShoppingCart,
    Cpu,
    Video,
    Palette
} from 'lucide-react';
import { getServices, Service } from '../api/client';
import './Services.css';

const iconMap: Record<string, React.ReactNode> = {
    'globe': <Globe />,
    'smartphone': <Smartphone />,
    'search': <Search />,
    'trending-up': <TrendingUp />,
    'code': <Code />,
    'shopping-cart': <ShoppingCart />,
    'cpu': <Cpu />,
    'video': <Video />,
    'palette': <Palette />
};

const Services = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServices();
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const defaultServices = [
        { id: 1, title: 'Web Development', description: 'Create tailored websites to showcase your business online effectively. We build responsive, fast, and SEO-optimized websites.', iconComponent: <Globe /> },
        { id: 2, title: 'Digital Marketing', description: 'Promote brands of all sizes with strategies that expand reach and visibility. From social media to PPC campaigns.', iconComponent: <TrendingUp /> },
        { id: 3, title: 'Graphic Design', description: 'Enhance branding with visually appealing and professional graphic designs that capture your brand essence.', iconComponent: <Palette /> },
        { id: 4, title: 'Mobile App Development', description: 'Build user-friendly apps that offer smooth navigation and enhance user experience on iOS and Android.', iconComponent: <Smartphone /> },
        { id: 5, title: 'Full Stack Development', description: 'Frontend and backend design, creating complete, functional web and mobile applications with modern technologies.', iconComponent: <Code /> },
        { id: 6, title: 'E-Commerce', description: 'Develop digital stores and platforms to boost online business operations with secure payment integrations.', iconComponent: <ShoppingCart /> },
        { id: 7, title: 'SEO', description: 'Improve site ranking, traffic, and sales through expert search engine optimization techniques.', iconComponent: <Search /> },
        { id: 8, title: 'IoT', description: 'Connect devices and digital services to deliver innovative web-based solutions for smart ecosystems.', iconComponent: <Cpu /> },

    ];

    const getIcon = (service: any) => {
        if (service.iconComponent) return service.iconComponent;
        if (service.icon && iconMap[service.icon]) return iconMap[service.icon];
        return <Globe />;
    };

    const displayServices = services.length > 0 ? services : defaultServices;

    return (
        <div className="services-page">
            <section className="services-hero">
                <h1>Our Services</h1>
                <p>Comprehensive digital solutions for your business growth</p>
            </section>

            <section className="services-content">
                <div className="services-container">
                    {loading ? (
                        <div className="loading">Loading services...</div>
                    ) : (
                        <div className="services-list">
                            {displayServices.map((service) => (
                                <div key={service.id} className="service-item">
                                    <span className="service-icon">
                                        {getIcon(service)}
                                    </span>
                                    <div className="service-info">
                                        <h3>{service.title}</h3>
                                        <p>{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Services;
