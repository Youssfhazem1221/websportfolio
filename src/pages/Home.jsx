import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PenTool, BarChart3, Globe, ArrowRight, Star, Sparkles } from 'lucide-react';
import projects from '../data/projects.json';

const Home = () => {
  const featuredProjects = projects.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 }
    }
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
      className="page-main"
    >
      <section className="hero">
        <div className="container">
          <div className="hero-inner hero-centered">
            {/* Role Chips */}
            <motion.div variants={itemVariants} className="hero-roles">
              <span className="hero-role-chip">
                <PenTool size={14} /> UI/UX Engineer
              </span>
              <span className="hero-role-chip hero-role-chip--purple">
                <BarChart3 size={14} /> Business Analyst
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="hero-title">
              Crafting Digital
              <span>Experiences That Matter</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-subtitle" style={{ textAlign: 'center', margin: '0 auto 3rem' }}>
              I'm Youssf Hazem — based in Cairo, serving clients worldwide.
              <br />
              I turn complex ideas into intuitive, beautiful digital products.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-actions">
              <Link to="/projects" className="btn-primary">
                See My Work <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn-outline">
                Get in Touch <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div variants={itemVariants} className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">5+</span>
                <span className="hero-stat-label">Years Experience</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-value">30+</span>
                <span className="hero-stat-label">Projects Delivered</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-value">🇪🇬</span>
                <span className="hero-stat-label">Based in Cairo</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="section">
        <div className="container">
          <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
              {[
                { icon: <PenTool />, title: "UI/UX Engineering", text: "Designing and building intuitive, user-centered digital products with modern interface design patterns and seamless user experiences." },
                { icon: <BarChart3 />, title: "Business Strategy & Analysis", text: "Data-driven insights, product strategy, and business analysis to help your product grow smarter and align with user needs." },
                { icon: <Globe />, title: "Global Reach", text: "Serving clients across Egypt and internationally — delivering world-class digital solutions wherever you are." }
              ].map((feature, i) => (
                <div key={i}>
                  <div style={{ color: 'var(--accent-cyan)', marginBottom: '1.5rem' }}>
                    {React.cloneElement(feature.icon, { size: 36 })}
                  </div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.375rem' }}>{feature.title}</h3>
                  <p style={{ fontSize: '1rem' }}>{feature.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section">
        <div className="container">
          <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="hero-eyebrow" style={{ marginBottom: '1rem' }}>Featured Work</p>
              <h2 className="hero-title" style={{ fontSize: '3rem', margin: 0 }}>Recent Projects</h2>
            </div>
            <Link to="/projects" className="nav-link">View All →</Link>
          </motion.div>

          <div className="projects-grid">
            {featuredProjects.map((project, i) => (
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
                    <Star size={14} color="var(--accent-cyan)" />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>PROJECT {String(i+1).padStart(2, '0')}</span>
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
      </section>
    </motion.div>
  );
};

export default Home;
