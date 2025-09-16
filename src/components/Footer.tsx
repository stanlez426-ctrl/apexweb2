import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUp, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://instagram',
      label: 'Instagram'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com',
      label: 'LinkedIn'
    },
    {
      icon: Twitter,
      href: 'https://x.com/Apexwebagency?t=CWy1hilYi2IU_0V2HmLcBA&s=09',
      label: 'Twitter'
    }
  ];

  return (
    <footer id="footer" className="bg-navy-900 border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-900"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
            {/* Logo & Copyright */}
            <div className="text-center md:text-left">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xl sm:text-2xl font-bold text-white mb-2"
              >
                Nexora
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/60 text-sm sm:text-base"
              >
                © 2025 Apexweb Agency. All rights reserved.
              </motion.p>
            </div>

            {/* Social Links */}
            <nav className="flex justify-center space-x-4 sm:space-x-6" aria-label="Social media links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 sm:w-12 sm:h-12 bg-navy-800/50 border border-white/10 rounded-lg flex items-center justify-center hover:border-purple/50 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover:text-purple transition-colors duration-300" />
                  <div className="absolute inset-0 bg-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </motion.a>
              ))}
            </nav>

            {/* Scroll to Top */}
            <div className="text-center md:text-right">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                onClick={scrollToTop}
                className="group inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-purple/20 border border-white/20 rounded-lg text-white/80 hover:text-white hover:border-purple/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                aria-label="Scroll back to top of page"
              >
                <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:-translate-y-1 transition-transform duration-300" aria-hidden="true" />
                Back to Top
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-white/10 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-white/60 text-xs sm:text-sm mb-4 md:mb-0"
            >
              Transforming ideas into powerful code, one project at a time.
            </motion.p>
            
            <motion.nav
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm"
              aria-label="Footer navigation"
            >
             <span className='text-white/60 text-xs sm:text-sm mb-4 md:mb-0'>Made With ❤️ Apexweb Agency</span>
            </motion.nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;