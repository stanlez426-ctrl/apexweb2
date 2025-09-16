import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ExternalLink, Code, Eye } from 'lucide-react';

const PreviousWorks: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      name: 'Smart Dentist',
      description: 'A modern dental practice Website.',
      image: 'https://i.postimg.cc/dZdt9DHv/Screenshot-20250916-110455.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
      liveUrl: 'https://smartdentist.netlify.app/',
      technologies: ['React', 'Tailwind CSS', 'Netlify'],
    },
    {
      name: 'Mezan Masterflow',
      description: 'A Premuim multi-handyman service website.',
      image: 'https://i.postimg.cc/wy1B7wD1/Screenshot-20250916-110659.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
      liveUrl: 'https://mezan-masterflow.vercel.app/',
      technologies: ['Next.js', 'TypeScript', 'Vercel'],
    },
    {
      name: 'Talos Roof Guard',
      description: 'Roof inspection and maintenance service Website.',
      image: 'https://i.postimg.cc/8JxzWLbt/Screenshot-20250916-110605.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
      liveUrl: 'https://talos-roof-guard.vercel.app/',
      technologies: ['React', 'Vercel'],
    },
    {
      name: 'SSC Carpentry',
      description: 'Showcase website for a premium carpentry service with portfolio gallery and quote requests.',
      image: 'https://i.postimg.cc/zVZfGSvf/Screenshot-20250916-110358.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
      liveUrl: 'https://ssccarpentry.netlify.app/',
      technologies: ['HTML/CSS', 'JavaScript', 'Netlify'],
    }
  ];

  // Duplicate projects for seamless loop
  const duplicatedProjects = [...projects, ...projects];

  return (
    <section id="previous-works" ref={ref} className="py-12 sm:py-16 lg:py-20 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl will-change-transform"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-blue-400/3 rounded-full blur-3xl will-change-transform"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Our{' '}
            <span className="text-blue-400">
              Previous Works
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto px-4">
            Explore our portfolio of successful projects and see how we've helped businesses transform their digital presence.
          </p>
        </motion.div>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            ref={containerRef}
            className="flex"
            animate={{ 
              x: [0, -((containerRef.current?.scrollWidth || 0) / 2)]
            }}
            transition={{ 
              duration: 40,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{ 
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {duplicatedProjects.map((project, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pr-6 sm:pr-8"
              >
                <article className="group relative bg-navy-700/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105 h-full flex flex-col">
                  <div className="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Preview Image */}
                    <div className="relative mb-6 overflow-hidden rounded-lg">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Project Name */}
                    <h3 className="text-white font-bold text-xl mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {project.name}
                    </h3>

                    {/* Project Description */}
                    <p className="text-white/70 mb-4 flex-grow">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-blue-400/10 text-blue-300 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Visit Live Button */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Live
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-white/80 mb-6 text-lg">
            Interested in working with us on your next project?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(90deg, #0369a1 0%, #0ea5e9 100%)'
            }}
            aria-label="Start your project today - Contact us"
          >
            Start Your Project Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PreviousWorks;