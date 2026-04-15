import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import projects from '../data/projects.json';

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="page-main section"
    >
      <div className="container">
        {/* Page Header */}
        <motion.div variants={itemVariants} style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <p className="hero-eyebrow">My Portfolio</p>
          <h1 className="hero-title" style={{ fontSize: '4rem' }}>Selected Work</h1>
          <p className="hero-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
            A collection of UI/UX design and strategy projects I've delivered for clients across Egypt and beyond.
          </p>
        </motion.div>

        {/* Featured Project — Large Card */}
        <motion.div variants={itemVariants} style={{ marginBottom: '4rem' }}>
          <Link to={"/project/" + featured.id} className="project-featured glass-panel glow-border" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', borderRadius: '2rem', overflow: 'hidden' }}>
            <div className="project-featured-img" style={{ aspectRatio: '16/11', overflow: 'hidden' }}>
              <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
            </div>
            <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span className="tag" style={{ background: 'rgba(0, 242, 255, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 242, 255, 0.2)' }}>Featured</span>
                <span className="tag">{featured.year}</span>
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', lineHeight: 1.15 }}>{featured.title}</h2>
              <p style={{ fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.7 }}>{featured.subtitle}</p>
              <div className="tags" style={{ marginBottom: '2rem' }}>
                {featured.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <span className="nav-link" style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9375rem' }}>
                View Case Study <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Rest of Projects — Grid */}
        <div className="projects-grid">
          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="project-card glass-panel glow-border"
            >
              <Link to={"/project/" + project.id}>
                <div className="project-card-img-wrap">
                  <img src={project.image} alt={project.title} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>PROJECT {String(i+2).padStart(2, '0')}</span>
                  <span className="tag" style={{ marginLeft: 'auto' }}>{project.year}</span>
                </div>
                <h3 className="project-card-title">{project.title}</h3>
                <p style={{ fontSize: '0.9375rem', marginBottom: '1.5rem' }}>{project.subtitle}</p>
                <div className="tags">
                  {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
