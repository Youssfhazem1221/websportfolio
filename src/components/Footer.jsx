import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      title: 'Email',
      href: 'mailto:youssf.hazem1221@gmail.com',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      title: 'WhatsApp',
      href: 'https://wa.me/201069237525',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/in/youssfhazem12211',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      title: 'Behance',
      href: 'https://www.behance.net/youssfhazem1221',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.645 1-1.12 1.35-.47.35-1.01.6-1.618.78-.61.18-1.256.27-1.943.27H0v-15.2h6.938zm-.21 6.23c.595 0 1.09-.15 1.47-.44.38-.29.56-.75.56-1.34 0-.344-.06-.625-.18-.84-.12-.216-.29-.384-.49-.504-.21-.12-.44-.2-.69-.24-.26-.04-.52-.06-.79-.06H3.59v3.42h3.14zm.2 6.58c.3 0 .59-.03.87-.09.27-.06.52-.16.73-.3.21-.14.38-.33.5-.57.13-.24.2-.55.2-.93 0-.74-.22-1.28-.66-1.62-.44-.34-1.01-.51-1.74-.51H3.59v4.02h3.34zM15.06 4.18h5.8v1.62h-5.8V4.18zm5.97 11.11c.32.48.84.72 1.58.72.53 0 .99-.14 1.36-.41.37-.28.59-.54.65-.8h2.16c-.51 1.51-1.28 2.57-2.32 3.16-1.04.6-2.24.91-3.62.91-.98 0-1.86-.16-2.64-.5-.79-.33-1.45-.8-2-1.4-.54-.6-.96-1.32-1.25-2.14-.3-.82-.44-1.72-.44-2.7 0-.95.15-1.82.46-2.63.3-.8.73-1.5 1.28-2.08.55-.58 1.2-1.03 1.97-1.34.76-.32 1.59-.48 2.49-.48.99 0 1.86.2 2.6.57.74.38 1.36.9 1.84 1.56.49.66.84 1.43 1.07 2.31.22.88.3 1.82.24 2.83h-8.54c-.03.96.24 1.72.58 2.2zm2.75-5.49c-.23-.44-.72-.73-1.38-.73-.42 0-.77.08-1.06.23-.28.15-.52.34-.7.57-.18.23-.32.48-.4.74-.08.26-.14.51-.16.75h4.66c-.06-.55-.23-1.12-.96-1.56z"/>
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { label: 'Work', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="site-footer">
      <div className="container" style={{ paddingBottom: '3rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel"
          style={{ padding: '3.5rem', borderRadius: '2.5rem' }}
        >
          {/* Top section — 3 columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            {/* Brand */}
            <div>
              <p className="site-logo" style={{ marginBottom: '1.25rem' }}>
                <img src="/LOGO main.png" alt="Youssf Hazem" style={{ height: '32px' }} />
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, maxWidth: '20rem' }}>
                Designing and building digital experiences from Cairo to the world. Let's create something great together.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-cyan)', marginBottom: '1.5rem' }}>
                Quick Links
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {quickLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="nav-link" style={{ fontSize: '0.9375rem' }}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Connect */}
            <div>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-cyan)', marginBottom: '1.5rem' }}>
                Connect
              </h4>
              <div className="footer-socials" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.title}
                    className="footer-social-icon"
                    whileHover={{ y: -4, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '1.5rem', lineHeight: 1.6 }}>
                youssf.hazem1221@gmail.com
                <br />
                +20 106 923 7525
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Youssf Hazem. All rights reserved.
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Built with <span style={{ color: 'var(--accent-purple)' }}>✧</span> in Cairo, Egypt
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
