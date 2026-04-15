import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import projects from '../data/projects.json';

const Projects = () => {
  const allTags = [...new Set(projects.flatMap(p => p.tags))];
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.tags.includes(activeFilter));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
      style={{ paddingTop: '8rem' }}
    >
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Page Header */}
        <motion.div variants={itemVariants} style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <p className="hero-eyebrow"><Sparkles size={12} style={{ marginRight: '6px' }} /> My Portfolio</p>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)' }}>
            Selected <span>Work</span>
          </h1>
          <p className="hero-subtitle" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '36rem' }}>
            A curated collection of UI/UX design and brand strategy projects delivered for clients across Egypt and beyond.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', gap: '0.625rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
          {['All', ...allTags].map(tag => (
            <motion.button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '2rem',
                border: activeFilter === tag ? '1px solid var(--accent-cyan)' : '1px solid var(--border)',
                background: activeFilter === tag ? 'rgba(0, 242, 255, 0.1)' : 'rgba(255,255,255,0.02)',
                color: activeFilter === tag ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid — Consistent Card Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="projects-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="project-card glass-panel glow-border"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={"/project/" + project.id} style={{ display: 'block' }}>
                  {/* Image */}
                  <div className="project-card-img-wrap" style={{ aspectRatio: '16/10', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    />
                  </div>

                  {/* Meta row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span className="tag" style={{ background: 'rgba(0, 242, 255, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 242, 255, 0.2)' }}>
                      {project.tags[0]}
                    </span>
                    <span className="tag">{project.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="project-card-title" style={{ fontSize: '1.375rem', marginBottom: '0.625rem', lineHeight: 1.2 }}>{project.title}</h3>

                  {/* Subtitle */}
                  <p style={{ fontSize: '0.9375rem', marginBottom: '1.5rem', lineHeight: 1.6, color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.subtitle}</p>

                  {/* Tags */}
                  <div className="tags" style={{ marginBottom: '1.5rem' }}>
                    {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>

                  {/* CTA */}
                  <span className="nav-link" style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    View Case Study <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginTop: 'clamp(4rem, 6vw, 6rem)' }}>
          <div className="glass-panel" style={{ padding: 'clamp(2rem, 4vw, 3.5rem)', borderRadius: '1.5rem', display: 'inline-block', maxWidth: '36rem' }}>
            <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', marginBottom: '1rem', color: '#fff' }}>Interested in working together?</h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              I'm always open to new opportunities and collaborations. Let's create something remarkable.
            </p>
            <Link to="/contact" className="btn-primary" style={{ margin: '0 auto' }}>
              Get in Touch <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
