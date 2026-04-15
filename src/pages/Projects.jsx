import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';
import projects from '../data/projects.json';

const Projects = () => {
  const allTags = [...new Set(projects.flatMap(p => p.tags))];
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.tags.includes(activeFilter));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  // First project gets a massive hero treatment
  const heroProject = filtered[0];
  const restProjects = filtered.slice(1);

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
        <motion.div variants={itemVariants} style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p className="hero-eyebrow"><Sparkles size={12} style={{ marginRight: '6px' }} /> My Portfolio</p>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)' }}>
            Selected <span>Work</span>
          </h1>
          <p className="hero-subtitle" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '36rem' }}>
            A curated collection of UI/UX design and brand strategy projects delivered for clients across Egypt and beyond.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', gap: '0.625rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
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

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Hero Project — Full Width Showcase */}
            {heroProject && (
              <motion.div variants={itemVariants} style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
                <Link to={"/project/" + heroProject.id} style={{ display: 'block', borderRadius: '2rem', overflow: 'hidden', position: 'relative' }} className="glass-panel glow-border project-featured">
                  <div style={{ position: 'relative', aspectRatio: '16/7', overflow: 'hidden' }}>
                    <img
                      src={heroProject.image}
                      alt={heroProject.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                    />
                    {/* Gradient overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.4) 40%, transparent 70%)',
                    }} />
                    {/* Content over image */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(1.5rem, 3vw, 3.5rem)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span className="tag" style={{ background: 'rgba(0, 242, 255, 0.15)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 242, 255, 0.3)', backdropFilter: 'blur(10px)' }}>
                          ✦ FEATURED
                        </span>
                        <span className="tag" style={{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.08)' }}>{heroProject.year}</span>
                      </div>
                      <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', marginBottom: '0.75rem', lineHeight: 1.1, color: '#fff', maxWidth: '32rem' }}>{heroProject.title}</h2>
                      <p style={{ fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', maxWidth: '30rem' }}>{heroProject.subtitle}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <div className="tags">
                          {heroProject.tags.map(tag => <span key={tag} className="tag" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}>{tag}</span>)}
                        </div>
                        <span className="nav-link" style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
                          View Case Study <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Rest of Projects — Alternating Split Layout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 4vw, 4rem)' }}>
              {restProjects.map((project, index) => {
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
                        borderRadius: '1.5rem',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Image */}
                      <div className="project-featured-img" style={{ flex: '1 1 55%', overflow: 'hidden', minHeight: '280px' }}>
                        <img
                          src={project.image}
                          alt={project.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                        />
                      </div>

                      {/* Content */}
                      <div style={{ flex: '1 1 45%', padding: 'clamp(1.5rem, 3vw, 3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                          <span className="tag" style={{ background: 'rgba(0, 242, 255, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 242, 255, 0.2)' }}>
                            PROJECT {String(index + 2).padStart(2, '0')}
                          </span>
                          <span className="tag">{project.year}</span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)', marginBottom: '0.875rem', lineHeight: 1.2, color: '#fff' }}>{project.title}</h2>
                        <p style={{ fontSize: '0.9375rem', marginBottom: '1.75rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>{project.subtitle}</p>
                        <div className="tags" style={{ marginBottom: '1.75rem' }}>
                          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                        </div>
                        <span className="nav-link" style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          View Case Study <ArrowRight size={16} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
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
