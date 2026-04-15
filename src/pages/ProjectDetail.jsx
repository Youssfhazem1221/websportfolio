import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, ExternalLink, ArrowRight } from 'lucide-react';
import projects from '../data/projects.json';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-main"
    >
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Link to="/projects" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '4rem' }}>
            <ChevronLeft size={16} /> Back to Projects
          </Link>

          <header style={{ marginBottom: '6rem' }}>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="hero-eyebrow" style={{ color: 'var(--accent-purple)', background: 'rgba(188, 19, 254, 0.1)', border: '1px solid rgba(188, 19, 254, 0.2)' }}>PROJECT #{project.id.toUpperCase()}</p>
              <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, marginTop: '2rem' }}>{project.title}</h1>
              <p className="hero-subtitle" style={{ fontSize: '1.5rem', marginTop: '2.5rem' }}>{project.subtitle}</p>
            </motion.div>
          </header>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="glass-panel" 
              style={{ padding: '3rem' }}
            >
              <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Star size={20} color="var(--accent-cyan)" /> Overview
              </h3>
              <p style={{ lineHeight: 1.8 }}>{project.description}</p>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="glass-panel" 
              style={{ padding: '3rem' }}
            >
              <h3 style={{ marginBottom: '2rem' }}>Project Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>TIMELINE</p>
                  <p>{project.year}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>TECHNOLOGIES</p>
                  <div className="tags">
                    {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="project-hero-img" 
            style={{ borderRadius: '2.5rem', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '6rem' }}
          >
            <img src={project.image} alt={project.title} style={{ width: '100%', display: 'block' }} />
          </motion.div>

          {/* Presentation Images (Full Project Details) */}
          {project.presentationImages && project.presentationImages.length > 0 && (
            <div className="presentation-images" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '6rem' }}>
              {project.presentationImages.map((img, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  style={{ borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid var(--border)' }}
                >
                  <img src={img} alt={`${project.title} detailed view ${idx + 1}`} style={{ width: '100%', display: 'block' }} />
                </motion.div>
              ))}
            </div>
          )}

          {project.stats && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '8rem' }}>
              {project.stats.map((stat, i) => (
                <div key={i} className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
                  <p className="hero-title" style={{ fontSize: '2.5rem', margin: 0, color: 'var(--accent-cyan)' }}>{stat.value}</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.5rem' }}>{stat.label.toUpperCase()}</p>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', padding: '6rem 0', borderTop: '1px solid var(--border)' }}>
             <h2 className="hero-title" style={{ fontSize: '3rem', marginBottom: '2.5rem' }}>See It Live</h2>
             <a href={project.link || "#"} className="btn-primary" target="_blank" rel="noopener noreferrer">
               Visit Website <ExternalLink size={20} />
             </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectDetail;
