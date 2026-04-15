import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, Clock, Send } from 'lucide-react';
import blogs from '../data/blogs.json';

const BlogPost = () => {
  const { id } = useParams();
  const post = blogs.find(b => b.id === id);

  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-main section"
    >
      <div className="container">
        <Link to="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '4rem' }}>
          <ChevronLeft size={16} /> Back to Blog
        </Link>
        
        <article style={{ maxWidth: '52rem', margin: '0 auto' }}>
          <motion.header 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ marginBottom: '5rem' }}
          >
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                <Calendar size={18} /> {post.date}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent-purple)' }}>
                <Clock size={18} /> {post.readTime}
              </div>
            </div>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1 }}>{post.title}</h1>
            <div className="tags" style={{ marginTop: '2.5rem' }}>
              {post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </motion.header>

          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-panel" 
            style={{ padding: '4rem', fontSize: '1.125rem', lineHeight: 2 }}
          >
            {post.content.map((block, i) => (
              <div key={i} style={{ marginBottom: '2.5rem' }}>
                {block.type === 'heading' ? (
                  <h2 className="glow-text" style={{ fontSize: '2rem', marginTop: '2rem', color: '#fff' }}>{block.text}</h2>
                ) : (
                  <p style={{ color: 'var(--text-muted)' }}>{block.text}</p>
                )}
              </div>
            ))}
          </motion.div>

          <footer style={{ marginTop: '8rem', textAlign: 'center' }}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-panel" 
              style={{ padding: '5rem' }}
            >
              <h2 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Have a Project in Mind?</h2>
              <p style={{ marginBottom: '3rem', maxWidth: '32rem', margin: '0 auto 3rem' }}>
                Let's talk about how I can help bring your ideas to life.
              </p>
              <Link to="/contact" className="btn-primary">
                Get in Touch <Send size={20} />
              </Link>
            </motion.div>
          </footer>
        </article>
      </div>
    </motion.div>
  );
};

export default BlogPost;
