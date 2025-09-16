import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Smartphone, Bot } from 'lucide-react';

const Services: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks like React, Next.js, and TypeScript for optimal performance and scalability.',
      features: ['Responsive Design', 'SEO Optimized', 'Performance Focused', 'Modern Technologies']
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android devices.',
      features: ['Cross-Platform', 'Native Performance', 'App Store Ready', 'Offline Support']
    },
    {
      icon: Bot,
      title: 'AI Agent',
      description: 'Intelligent virtual assistants that automate tasks, enhance productivity, and deliver personalized user interactions across platforms.',
      features: ['Natural Language Processing', 'Task Automation', 'Context Awareness', 'Multi-platform Support']
    }
  ];

  return (
    <section id="services" ref={ref} className="py-12 sm:py-16 lg:py-20 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Our{' '}
            <span className="text-purple">
              Services
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto px-4">
            We offer comprehensive digital solutions to help your business thrive in the modern landscape
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="cursor-pointer group relative bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10 hover:border-purple/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-purple/20 rounded-lg mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-purple" aria-hidden="true" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-purple transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-white/80 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>

                <ul className="space-y-2" role="list">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-white/70 text-sm sm:text-base">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple rounded-full mr-2 sm:mr-3 flex-shrink-0" aria-hidden="true"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;