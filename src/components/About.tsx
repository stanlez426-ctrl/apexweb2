import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" ref={ref} className="py-12 sm:py-16 lg:py-20 bg-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-800"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Optimized Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative bg-navy-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-purple/5"></div>
              <picture>
                <source 
                  media="(max-width: 640px)" 
                  srcSet="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
                />
                <source 
                  media="(max-width: 1024px)" 
                  srcSet="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600&h=450"
                />
                <img
                  src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
                  alt="Team collaboration in modern office environment"
                  className="w-full h-60 sm:h-72 lg:h-80 object-cover rounded-lg"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                />
              </picture>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
              >
                Crafting Digital Excellence{' '}
                <span className="text-purple">
                  Since 2021
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base sm:text-lg text-white/80 leading-relaxed mb-4 sm:mb-6"
              >
                We are a passionate team of developers, designers, and strategists dedicated to 
                transforming your vision into powerful digital solutions. Our expertise spans 
                across modern web technologies, mobile development, and user experience design.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-base sm:text-lg text-white/80 leading-relaxed mb-6 sm:mb-8"
              >
                From concept to deployment, we prioritize client collaboration, fostering open 
                communication to ensure every project exceeds expectations and delivers 
                measurable results.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(90deg, #4C1D95 0%, #312E81 100%)'
                }}
                aria-label="Contact us to start your project"
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;