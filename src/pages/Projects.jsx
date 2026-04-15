import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Eye } from 'lucide-react';
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

  const heroProject = filtered[0];
  const gridProjects = filtered.slice(1);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="page-main section"
      style={{ paddingTop: '8rem' }}
    >
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <motion.div variants={itemVariants} style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <p className="hero-eyebrow"><Sparkles size={12} style={{ marginRight: '6px' }} /> My Portfolio</p>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)' }}>
            Selected <span>Work</span>
          </h1>
          <p className="hero-subtitle" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '36rem' }}>
            A curated collection of UI/UX design and brand strategy projects delivered for clients across Egypt and beyond.
          </p>
        </motion.div>

        {/* Project Counter + Filters */}
        <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Showing <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{filtered.length}</span> project{filtered.length !== 1 ? 's' : ''}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['All', ...allTags].map(tag => (
              <motion.button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '2rem',
                  border: activeFilter === tag ? '1px solid var(--accent-cyan)' : '1px solid var(--border)',
                  background: activeFilter === tag ? 'rgba(0, 242, 255, 0.1)' : 'transparent',
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
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Hero Featured Project */}
            {heroProject && (
              <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
                <Link
                  to={"/project/" + heroProject.id}
                  className="glass-panel glow-border project-featured"
                  style={{ display: 'block', borderRadius: '1.5rem', overflow: 'hidden', position: 'relative' }}
                >
                  <div style={{ position: 'relative', aspectRatio: '21/9', overflow: 'hidden' }}>
                    <img
                      src={heroProject.image}
                      alt={heroProject.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(135deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.3) 50%, transparent 100%)',
                    }} />
                    <div style={{ position: 'absolute', inset: 0, padding: 'clamp(1.5rem, 3vw, 3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span className="tag" style={{ background: 'rgba(0, 242, 255, 0.15)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 242, 255, 0.3)', backdropFilter: 'blur(10px)' }}>
                          ✦ FEATURED
                        </span>
                        {heroProject.tags.map(t => (
                          <span key={t} className="tag" style={{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.08)' }}>{t}</span>
                        ))}
                      </div>
                      <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', marginBottom: '0.625rem', lineHeight: 1.1, color: '#fff', maxWidth: '30rem' }}>{heroProject.title}</h2>
                      <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.65)', maxWidth: '28rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>{heroProject.subtitle}</p>
                      <span className="nav-link" style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        View Case Study <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Project Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {gridProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={"/project/" + project.id}
                    className="glass-panel glow-border"
                    style={{ display: 'block', borderRadius: '1.25rem', overflow: 'hidden', height: '100%' }}
                  >
                    {/* Image with overlay on hover */}
                    <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                        className="project-card-hover-img"
                      />
                      {/* Hover overlay */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: 0, transition: 'opacity 0.4s ease',
                      }} className="project-card-overlay">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '0.875rem', fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '2rem', background: 'rgba(0,242,255,0.15)', border: '1px solid rgba(0,242,255,0.3)', backdropFilter: 'blur(10px)' }}>
                          <Eye size={16} /> View Project
                        </div>
                      </div>
                      {/* Year badge */}
                      <span style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.6875rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '1rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {project.year}
                      </span>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.5rem' }}>
                      <div className="tags" style={{ marginBottom: '0.875rem' }}>
                        {project.tags.map(tag => (
                          <span key={tag} className="tag" style={{ fontSize: '0.6875rem' }}>{tag}</span>
                        ))}
                      </div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: 1.25, color: '#fff' }}>{project.title}</h3>
                      <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.subtitle}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
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
