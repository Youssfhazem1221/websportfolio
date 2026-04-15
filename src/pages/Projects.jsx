import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import projects from '../data/projects.json';

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="page-main section"
    >
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Page Header */}
        <motion.div variants={itemVariants} style={{ marginBottom: '6rem', textAlign: 'center' }}>
          <p className="hero-eyebrow">My Portfolio</p>
          <h1 className="hero-title" style={{ fontSize: '4rem' }}>Selected Work</h1>
          <p className="hero-subtitle" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '40rem' }}>
            A collection of UI/UX design and strategy projects I've delivered for clients across Egypt and beyond.
          </p>
        </motion.div>

        {/* Stack of Featured Projects */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div key={project.id} variants={itemVariants}>
                <Link 
                  to={"/project/" + project.id} 
                  className="project-featured glass-panel glow-border" 
                  style={{ 
                    display: 'flex', 
                    flexDirection: isEven ? 'row' : 'row-reverse', 
                    gap: '0', 
                    borderRadius: '2rem', 
                    overflow: 'hidden' 
                  }}
                >
                  {/* Image Div */}
                  <div className="project-featured-img" style={{ flex: '1 1 55%', overflow: 'hidden', minHeight: '300px' }}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} 
                    />
                  </div>

                  {/* Content Div */}
                  <div style={{ flex: '1 1 45%', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                      <span className="tag" style={{ background: 'rgba(0, 242, 255, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 242, 255, 0.2)' }}>
                        PROJECT {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="tag">{project.year}</span>
                    </div>
                    <h2 style={{ fontSize: '2.25rem', marginBottom: '1.25rem', lineHeight: 1.15, color: '#fff' }}>{project.title}</h2>
                    <p style={{ fontSize: '1.0625rem', marginBottom: '2.5rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>{project.subtitle}</p>
                    <div className="tags" style={{ marginBottom: '2.5rem' }}>
                      {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                    <span className="nav-link" style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9375rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      View Case Study <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
