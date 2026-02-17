import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Reject non-JSON responses (e.g. HTML from Vercel SPA rewrites)
// This ensures try/catch blocks catch these and use fallback data
api.interceptors.response.use((response) => {
  const contentType = response.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    return Promise.reject(new Error('API not available (non-JSON response)'));
  }
  return response;
});

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Project {
  id: number;
  title: string;
  description: string | null;
  image: string | null;
  category: string | null;
  client_name: string | null;
  url: string | null;
  is_featured: boolean;
  sort_order: number;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  author: string | null;
  published_at: string | null;
  is_published: boolean;
}

export interface Testimonial {
  id: number;
  client_name: string;
  client_title: string | null;
  company: string | null;
  content: string;
  rating: number;
  image: string | null;
  is_active: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export const getServices = () => api.get<Service[]>('/services');
export const getProjects = (featured?: boolean) =>
  api.get<Project[]>('/projects', { params: { featured } });
export const getProject = (id: number) => api.get<Project>(`/projects/${id}`);
export const getBlogs = () => api.get<Blog[]>('/blogs');
export const getBlog = (slug: string) => api.get<Blog>(`/blogs/${slug}`);
export const getTestimonials = () => api.get<Testimonial[]>('/testimonials');
export const getSettings = (group?: string) =>
  api.get<Record<string, string>>('/settings', { params: { group } });
export const submitContact = (data: ContactForm) => api.post('/contact', data);

export default api;
