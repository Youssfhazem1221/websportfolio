import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import blogs from '../data/blogs.json';

const Blog = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="page-main section"
    >
      <div className="container">
        {/* Header */}
        <motion.div variants={itemVariants} style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <p className="hero-eyebrow">From the Blog</p>
          <h1 className="hero-title" style={{ fontSize: '4rem' }}>Blog</h1>
          <p className="hero-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
            Insights on UI/UX design, business strategy, and building digital products for the Egyptian and global market.
          </p>
        </motion.div>

        {/* Featured Post — Full Width */}
        <motion.div variants={itemVariants} style={{ marginBottom: '4rem' }}>
          <Link to={"/blog/" + featured.id} className="blog-featured glass-panel glow-border" style={{ display: 'block', padding: '3.5rem', borderRadius: '2rem', position: 'relative', overflow: 'hidden' }}>
            {/* Accent glow */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,242,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
            
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="tag" style={{ background: 'rgba(0, 242, 255, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 242, 255, 0.2)' }}>Latest</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <Calendar size={14} color="var(--accent-cyan)" /> {featured.date}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <Clock size={14} color="var(--accent-purple)" /> {featured.readTime}
              </div>
            </div>

            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1.25rem', color: '#fff', lineHeight: 1.2, maxWidth: '40rem' }}>{featured.title}</h2>
            <p style={{ fontSize: '1.0625rem', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '40rem' }}>{featured.excerpt}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div className="tags">
                {featured.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <span className="nav-link" style={{ color: 'var(--accent-cyan)', fontSize: '0.9375rem', fontWeight: 600 }}>
                Read Article <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Rest — List Style */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {rest.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Link to={"/blog/" + post.id} className="blog-list-item glass-panel glow-border" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', padding: '2rem 2.5rem', borderRadius: '1.25rem' }}>
                {/* Left: Meta */}
                <div style={{ minWidth: '120px', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    <Calendar size={13} color="var(--accent-cyan)" /> {post.date}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <Clock size={13} color="var(--accent-purple)" /> {post.readTime}
                  </div>
                </div>

                {/* Center: Content */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.375rem', marginBottom: '0.5rem', color: '#fff', lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1rem' }}>{post.excerpt}</p>
                  <div className="tags">
                    {post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>

                {/* Right: Arrow */}
                <div style={{ flexShrink: 0, color: 'var(--accent-cyan)' }}>
                  <ArrowRight size={20} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
