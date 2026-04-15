import React from 'react';
import { motion } from 'framer-motion';
import { Code, Briefcase, Zap, Award, MapPin, ArrowRight, Sparkles, Target, TrendingUp, Palette, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const skills = [
    { name: 'UX/UI Design', level: 95 },
    { name: 'Figma & Prototyping', level: 92 },
    { name: 'User Research', level: 88 },
    { name: 'Workflow Automation', level: 90 },
    { name: 'Brand Identity', level: 85 },
    { name: 'Information Architecture', level: 87 },
  ];

  const toolstack = ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects', 'FigJam', 'Miro', 'Notion', 'Jira', 'HTML/CSS', 'JavaScript', 'React'];

  const highlights = [
    { icon: <TrendingUp size={28} />, value: '50%', label: 'AHT Reduction', desc: 'At Shiny Smile Veneers' },
    { icon: <Target size={28} />, value: '93%', label: 'CSAT Score', desc: 'At Apple Support' },
    { icon: <Sparkles size={28} />, value: '30+', label: 'Projects', desc: 'Delivered worldwide' },
    { icon: <Award size={28} />, value: 'Google', label: 'UX Certified', desc: 'Professional Certificate' },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="page-main section"
      style={{ paddingTop: '8rem' }}
    >
      <div className="container" style={{ maxWidth: '1100px' }}>
        {/* Hero Intro */}
        <motion.div variants={itemVariants} style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <p className="hero-eyebrow">Get to Know Me</p>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)' }}>
            Designing with <span>Purpose & Precision</span>
          </h1>
          <p className="hero-subtitle" style={{ textAlign: 'center', margin: '0 auto 2.5rem', maxWidth: '38rem' }}>
            I'm Youssf Hazem — a UI/UX & Product Designer based in Cairo. I combine research-driven design with operational thinking to build digital products that genuinely move the needle.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/Youssf_Hazem_CV.pdf" className="btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '0.9375rem' }} download>
              Download CV <ArrowRight size={16} />
            </a>
            <Link to="/contact" className="btn-outline" style={{ padding: '0.875rem 2rem', fontSize: '0.9375rem' }}>
              Let's Talk <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Impact Highlights */}
        <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              className="glass-panel glow-border"
              whileHover={{ y: -4 }}
              style={{ padding: '2rem', textAlign: 'center' }}
            >
              <div style={{ color: i % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-purple)', marginBottom: '1rem' }}>
                {item.icon}
              </div>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>{item.value}</p>
              <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{item.label}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          
          {/* Skills with Progress Bars */}
          <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 242, 255, 0.08)', border: '1px solid rgba(0, 242, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code color="var(--accent-cyan)" size={20} />
              </div>
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Core Skills</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#eaeaea' }}>{skill.name}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{skill.level}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                      style={{ height: '100%', borderRadius: '3px', background: `linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Toolstack */}
            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Toolstack</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {toolstack.map(tool => (
                  <span key={tool} className="tag" style={{ border: '1px solid rgba(0, 242, 255, 0.15)', color: 'var(--accent-cyan)', padding: '0.375rem 0.875rem', fontSize: '0.75rem' }}>{tool}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(188, 19, 254, 0.08)', border: '1px solid rgba(188, 19, 254, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase color="var(--accent-purple)" size={20} />
              </div>
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Experience</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { role: 'Operations & CX Specialist', company: 'Shiny Smile Veneers', year: 'Nov 2025 — Present', desc: "Designed a Chrome extension to streamline agent ticket workflows. Reduced Average Handling Time by 50% and saved ~$2,700/month.", active: true },
                { role: 'Technical Specialist', company: 'Apple', year: 'Feb 2025 — Oct 2025', desc: "Supported iOS and macOS flows while developing deep familiarity with Apple's design patterns, maintaining a 93% CSAT score." },
                { role: 'Visual Creative Intern', company: 'RedRam Promotions', year: 'Jan 2022 — Sep 2022', desc: "Produced visual assets and led social media identity projects for brand campaigns." }
              ].map((exp, i) => (
                <div key={i} style={{ position: 'relative', paddingLeft: '2rem', paddingBottom: i < 2 ? '2.5rem' : '0' }}>
                  {/* Timeline line */}
                  {i < 2 && <div style={{ position: 'absolute', left: '5px', top: '14px', width: '1px', height: '100%', background: 'linear-gradient(180deg, var(--accent-purple), transparent)' }} />}
                  {/* Timeline dot */}
                  <div style={{ position: 'absolute', left: '0', top: '6px', width: '12px', height: '12px', borderRadius: '50%', border: '2px solid var(--accent-purple)', background: exp.active ? 'var(--accent-purple)' : 'transparent', boxShadow: exp.active ? '0 0 12px rgba(188, 19, 254, 0.5)' : 'none' }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.375rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h4 style={{ color: '#fff', fontSize: '1rem', lineHeight: 1.3 }}>{exp.role}</h4>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent-purple)' }}>{exp.company}</span>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>{exp.year}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{exp.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom: What I Bring */}
        <motion.div variants={itemVariants} style={{ marginTop: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {[
              { icon: <Palette size={22} />, title: 'Design Thinking', desc: 'Every decision starts with understanding the user. I empathize first, then design.' },
              { icon: <Layers size={22} />, title: 'Systems Mindset', desc: 'I build reusable design systems and scalable patterns — not one-off screens.' },
              { icon: <Zap size={22} />, title: 'Operational Impact', desc: "I don't just make things pretty — I measure and optimize for real business outcomes." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="glass-panel glow-border"
                whileHover={{ y: -4 }}
                style={{ padding: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
              >
                <div style={{ color: i === 0 ? 'var(--accent-cyan)' : i === 1 ? 'var(--accent-purple)' : 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#fff' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default About;
