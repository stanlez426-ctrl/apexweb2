import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'services', 'previous-works', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setActiveSection(sectionId);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Our Work', id: 'previous-works' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Desktop Luxury Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:block fixed top-6 left-0 right-0 z-50"
      >
        <div className="flex justify-center w-full">
          <div className="relative">
            {/* Glow Effect */}
            
            {/* Main Navbar */}
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full px-8 py-4 shadow-2xl">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full"></div>
              
              <div className="relative flex items-center space-x-8">
                {/* Logo */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="flex items-center space-x-2 pr-6 border-r border-white/20"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <img src="/images/nexora.png" alt="nexora" />
                  </div>
                  <span className="text-white font-bold text-lg tracking-wide">Apexweb</span>
                </motion.div>

                {/* Navigation Items */}
                <div className="flex items-center space-x-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                      className="relative"
                    >
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                          activeSection === item.id
                            ? 'text-white'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {/* Active background */}
                        {activeSection === item.id && (
                          <motion.div
                            layoutId="activeBackground"
                            className="absolute inset-0 rounded-lg"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        
                        {/* Hover effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                        
                        <span className="relative z-10">{item.label}</span>
                        
                        {/* Active indicator */}
                        {activeSection === item.id && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple rounded-full"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 bg-navy-900 backdrop-blur-2xl border-b border-white/10"
      >
        <div className="flex items-center justify-between h-16 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <div className="w-6 h-6 rounded-md flex items-center justify-center">
              <img src="/images/nexora.png" alt="nexora" />
            </div>
            <span className="text-white font-bold text-lg">Apexweb</span>
          </motion.div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-navy-900 backdrop-blur-2xl"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left transition-all duration-200 py-3 px-4 rounded-lg ${
                    activeSection === item.id
                      ? 'text-white bg-white/10 border border-white/20'
                      : 'text-white/70 hover:text-white '
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
};

export default Navbar;