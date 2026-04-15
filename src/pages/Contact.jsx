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
        <motion.div variants={itemVariants} style={{ marginBottom: '4rem' }}>
          <p className="hero-eyebrow">Let's Work Together</p>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)' }}>Get in Touch</h1>
          <p className="hero-subtitle">
            Have a project in mind? I'd love to hear about it. Drop me a message and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
          <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '2.5rem' }}>
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
              { 
                icon: (
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                ), 
                label: "WhatsApp", 
                value: "+20 106 923 7525", 
                href: "https://wa.me/201069237525", 
                color: "var(--accent-purple)" 
              },
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
