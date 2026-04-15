import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home as HomeIcon, Briefcase, User, BookOpen, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon size={18} /> },
    { name: 'Work', path: '/projects', icon: <Briefcase size={18} /> },
    { name: 'About', path: '/about', icon: <User size={18} /> },
    { name: 'Blog', path: '/blog', icon: <BookOpen size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} /> }
  ];

  return (
    <header className="site-header">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="header-inner"
      >
        <Link to="/" className="site-logo">
          <img src="/LOGO main.png" alt="yh" />
        </Link>
        
        <nav className="site-nav">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;
