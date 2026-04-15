import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ExternalLink, ArrowRight } from 'lucide-react';
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
      style={{ paddingBottom: 0 }}
    >
      {/* 1. Header / Intro Block - High Contrast, Editorial */}
      <section className="section" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div className="container">
          <Link to="/projects" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '4rem' }}>
            <ChevronLeft size={16} /> Back to Projects
          </Link>

          <header style={{ maxWidth: '64rem' }}>
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span className="tag" style={{ background: 'rgba(0,242,255,0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(0,242,255,0.2)' }}>Case Study</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>PROJECT {project.id.toUpperCase()}</span>
              </div>
              <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 1.05, marginBottom: '2rem' }}>
                {project.title}
              </h1>
              <p style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '48rem' }}>
                {project.subtitle}
              </p>
            </motion.div>
          </header>
        </div>
      </section>

      {/* 2. Hero Image - Full Width Bleed visually */}
      <section style={{ padding: '0 1.25rem', marginBottom: '6rem' }}>
        <div className="container" style={{ maxWidth: '1400px', padding: 0 }}>
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderRadius: '2rem', overflow: 'hidden', border: '1px solid var(--border)', aspectRatio: '16/9', background: '#111' }}
          >
            <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </motion.div>
        </div>
      </section>

      {/* 3. Editorial Overview & Details Split */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 2fr) minmax(280px, 1fr)', gap: '6rem' }} className="project-detail-grid">
            
            {/* Left: Overview (2/3) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#fff' }}>Overview</h2>
              <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {project.description.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            {/* Right: Meta Details (1/3) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', borderLeft: '1px solid var(--border)', paddingLeft: '3rem' }}
              className="project-meta-col"
            >
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>TIMELINE</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 500, color: '#fff' }}>{project.year}</p>
              </div>
              
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-purple)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>SERVICES & TECHNOLOGIES</p>
                <div className="tags" style={{ marginTop: '0.5rem' }}>
                  {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>

              {project.link && (
                <div style={{ marginTop: '1rem' }}>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '1.125rem', fontWeight: 600, borderBottom: '1px solid var(--accent-cyan)', paddingBottom: '4px', transition: 'var(--tr-smooth)' }} className="nav-link">
                    View Live Project <ExternalLink size={18} />
                  </a>
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Stats Row (Optional) */}
      {project.stats && project.stats.length > 0 && (
        <section className="section" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '4rem' }}>
              {project.stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ textAlign: 'center' }}
                >
                  <p className="hero-title" style={{ fontSize: '3.5rem', margin: 0, color: '#fff' }}>{stat.value}</p>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-cyan)', marginTop: '0.75rem' }}>{stat.label.toUpperCase()}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Full Presentation Images — Seamless Flow */}
      {project.presentationImages && project.presentationImages.length > 0 && (
        <section style={{ paddingBottom: '0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', overflow: 'hidden', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            {project.presentationImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                style={{ lineHeight: 0 }}
              >
                <img src={img} alt={`${project.title} presentation ${idx + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Footer CTA */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p className="hero-eyebrow" style={{ marginBottom: '1.5rem' }}>Next Steps</p>
          <h2 className="hero-title" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', marginBottom: '2.5rem' }}>Have a similar project?</h2>
          <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>
            Start a Conversation <ArrowRight size={20} />
          </Link>
        </div>
      </section>

    </motion.div>
  );
};

export default ProjectDetail;
