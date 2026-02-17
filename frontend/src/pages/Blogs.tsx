import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, Blog } from '../api/client';
import './Blogs.css';

const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getBlogs();
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const defaultBlogs = [
        {
            id: 1,
            title: 'The Rise of Autonomous AI Agents',
            slug: 'ai-agents',
            excerpt: 'Exploring how AI agents are transforming the digital landscape and business automation.',
            author: 'Ollow Team',
            published_at: '2024-01-15',
            image: null
        },
        {
            id: 2,
            title: 'How Modern Web Design Converts Visitors',
            slug: 'web-design-conversion',
            excerpt: 'Learn the key principles of web design that turn visitors into loyal customers.',
            author: 'Ollow Team',
            published_at: '2024-01-10',
            image: null
        },
        {
            id: 3,
            title: 'SEO and AEO: A Comprehensive Guide',
            slug: 'seo-aeo-guide',
            excerpt: 'Understanding both Search Engine Optimization and Answer Engine Optimization for better visibility.',
            author: 'Ollow Team',
            published_at: '2024-01-05',
            image: null
        },
    ];

    const displayBlogs = blogs.length > 0 ? blogs : defaultBlogs;

    return (
        <div className="blogs-page">
            <section className="blogs-hero">
                <h1>Our Journals</h1>
                <p>Insights, tips, and updates from our team</p>
            </section>

            <section className="blogs-content">
                <div className="blogs-container">
                    {loading ? (
                        <div className="loading">Loading blogs...</div>
                    ) : (
                        <div className="blogs-grid">
                            {displayBlogs.map((blog) => (
                                <article key={blog.id} className="blog-card">
                                    <div className="blog-image">
                                        {blog.image ? (
                                            <img src={blog.image} alt={blog.title} />
                                        ) : (
                                            <div className="blog-placeholder">📝</div>
                                        )}
                                    </div>
                                    <div className="blog-info">
                                        <span className="blog-meta">
                                            Posted by {blog.author || 'Owllow Team'}
                                        </span>
                                        <h3>
                                            <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                                        </h3>
                                        <p>{blog.excerpt}</p>
                                        <Link to={`/blogs/${blog.slug}`} className="read-more">
                                            Read More →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blogs;
