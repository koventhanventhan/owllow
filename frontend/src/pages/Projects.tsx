import { useEffect, useState } from 'react';
import { getProjects, Project } from '../api/client';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const defaultProjects = [
        { id: 1, title: 'NA GROUP Transportation', client_name: 'Canada', category: 'web', image: null },
        { id: 2, title: 'Teviot Technology', client_name: 'Canada', category: 'web', image: null },
        { id: 3, title: 'EuroDisneyTransfer', client_name: 'France', category: 'web', image: null },
        { id: 4, title: 'Funk Taxi Rüti ZH GmbH', client_name: 'Switzerland', category: 'web', image: null },
        { id: 5, title: 'The Dreamline Productions', client_name: 'USA', category: 'web', image: null },
        { id: 6, title: 'Canada Charter', client_name: 'Canada', category: 'web', image: null },
    ];

    const displayProjects = projects.length > 0 ? projects : defaultProjects;

    const categories = ['all', 'web', 'mobile', 'marketing'];

    const filteredProjects = filter === 'all'
        ? displayProjects
        : displayProjects.filter(p => p.category === filter);

    return (
        <div className="projects-page">
            <section className="projects-hero">
                <h1>Our Projects</h1>
                <p>Explore our portfolio of successful projects</p>
            </section>

            <section className="projects-content">
                <div className="projects-container">
                    <div className="projects-filter">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="loading">Loading projects...</div>
                    ) : (
                        <div className="projects-grid">
                            {filteredProjects.map((project) => (
                                <div key={project.id} className="project-card">
                                    <div className="project-image">
                                        {project.image ? (
                                            <img src={project.image} alt={project.title} />
                                        ) : (
                                            <div className="project-placeholder">🚀</div>
                                        )}
                                    </div>
                                    <div className="project-info">
                                        <h3>{project.title}</h3>
                                        {project.client_name && (
                                            <span className="client-name">{project.client_name}</span>
                                        )}
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

export default Projects;
