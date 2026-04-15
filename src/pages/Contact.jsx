import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Linkedin, Send, ExternalLink, Clock } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const [state, handleSubmit] = useForm('xbdqlvra');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="page-main section"
    >
      <div className="container">
        <motion.div variants={itemVariants} style={{ marginBottom: '6rem' }}>
          <p className="hero-eyebrow">Let's Work Together</p>
          <h1 className="hero-title" style={{ fontSize: '4rem' }}>Get in Touch</h1>
          <p className="hero-subtitle">
            Have a project in mind? I'd love to hear about it. Drop me a message and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
          <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '3.5rem' }}>
            {state.succeeded ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(0, 242, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                  <Send size={40} color="var(--accent-cyan)" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Message Sent!</h3>
                <p>Thanks for reaching out! I'll get back to you soon.</p>
                <button onClick={() => window.location.reload()} className="btn-primary" style={{ marginTop: '2.5rem' }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label htmlFor="name" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.1em' }}>YOUR NAME</label>
                  <input id="name" name="name" type="text" required placeholder="e.g. Ahmed, Sarah..." style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1rem', color: '#fff', outline: 'none' }} />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label htmlFor="email" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.1em' }}>YOUR EMAIL</label>
                  <input id="email" name="email" type="email" required placeholder="your@email.com" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1rem', color: '#fff', outline: 'none' }} />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label htmlFor="message" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.1em' }}>YOUR MESSAGE</label>
                  <textarea id="message" name="message" required placeholder="Tell me about your project..." style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1rem', color: '#fff', outline: 'none', minHeight: '12rem', resize: 'vertical' }} />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
                <button className="btn-primary" type="submit" disabled={state.submitting} style={{ width: '100%', justifyContent: 'center' }}>
                  {state.submitting ? 'Sending...' : <>Send Message <Send size={20} /></>}
                </button>
              </form>
            )}
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {[
              { icon: <Mail size={32} />, label: "Email", value: "youssf.hazem1221@gmail.com", href: "mailto:youssf.hazem1221@gmail.com", color: "var(--accent-cyan)" },
              { icon: <MessageSquare size={32} />, label: "WhatsApp", value: "+20 106 923 7525", href: "https://wa.me/201069237525", color: "var(--accent-purple)" },
              { icon: <Linkedin size={32} />, label: "LinkedIn", value: "LinkedIn Profile", href: "https://www.linkedin.com/in/youssfhazem12211", color: "#0077b5" }
            ].map((link, i) => (
              <motion.a 
                key={i} 
                variants={itemVariants}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'inherit' }}
                whileHover={{ x: 10 }}
              >
                <div style={{ color: link.color, background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                  {link.icon}
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>{link.label}</p>
                  <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{link.value}</p>
                </div>
              </motion.a>
            ))}
            
            <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '2rem', marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                <Clock size={16} color="var(--accent-cyan)" />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>AVAILABILITY</span>
              </div>
              <p style={{ fontSize: '0.9375rem' }}>Currently available for new projects. Response time: &lt; 24h.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
