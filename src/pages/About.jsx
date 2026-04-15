import React from 'react';
import { motion } from 'framer-motion';
import { Code, Briefcase, Zap, Target, Globe } from 'lucide-react';

const About = () => {
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
          <p className="hero-eyebrow">Get to Know Me</p>
          <h1 className="hero-title" style={{ fontSize: '4rem' }}>About Me</h1>
          <p className="hero-subtitle" style={{ maxWidth: '36rem' }}>
            Hey, I'm Youssf Hazem — a UI/UX & Product Designer based in Cairo, Egypt. With a Google UX Design Professional Certificate and a background in CX Operations, I build research-led, user-centric interfaces focused on solving real operational problems.
          </p>
          <motion.div variants={itemVariants} style={{ marginTop: '2.5rem' }}>
            <a href="/Youssf_Hazem_CV.pdf" className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '0.9375rem' }} download>
              Download CV
            </a>
          </motion.div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
          <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <Code color="var(--accent-cyan)" size={24} />
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Technical Skills</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {['Figma', 'UI/UX Design', 'Wireframing', 'User Research', 'React', 'Data Analysis', 'Product Strategy', 'Framer Motion'].map(skill => (
                <span key={skill} className="tag" style={{ border: '1px solid rgba(0, 242, 255, 0.2)', color: 'var(--accent-cyan)' }}>{skill}</span>
              ))}
            </div>
            <div style={{ marginTop: '3rem' }}>
              <h3 className="skill-group-title" style={{ color: 'var(--accent-cyan)', marginBottom: '1.5rem' }}>What I Specialize In</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9375rem' }}><Zap size={14} /> User-Centered Interface Design</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9375rem' }}><Zap size={14} /> Data-Driven Business Strategies</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9375rem' }}><Zap size={14} /> Translating User Needs to Product Specs</li>
              </ul>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <Briefcase color="var(--accent-purple)" size={24} />
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Experience</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {[
                { role: 'Operations & CX Specialist (Workflow UX)', company: 'Shiny Smile Veneers', year: 'Nov 2025 — PRESENT', desc: "Designed a Chrome extension to streamline agent ticket workflows, grounded in user research. Reduced Average Handling Time by 50% and saved the business ~$2,700/month." },
                { role: 'Technical Specialist', company: 'Apple', year: 'Feb 2025 — Oct 2025', desc: "Supported iOS and macOS flows while developing deep familiarity with Apple's design patterns and product ecosystem, maintaining a 93% CSAT score." },
                { role: 'Visual Creative Intern', company: 'RedRam Promotions', year: 'Jan 2022 — Sep 2022', desc: "Produced visual assets and led social media identity projects for brand campaigns." }
              ].map((exp, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h4 style={{ color: '#fff', fontSize: '1.125rem' }}>{exp.role}</h4>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'rgba(188, 19, 254, 0.1)', padding: '4px 8px', borderRadius: '4px', color: 'var(--accent-purple)' }}>{exp.year}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{exp.company}</p>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>{exp.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
