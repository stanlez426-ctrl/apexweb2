import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      rating: 5,
      review: 'Apexweb transformed our vision into a stunning reality. Their attention to detail and technical expertise exceeded our expectations. The team delivered a scalable solution that has significantly boosted our business growth.'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager, InnovateLab',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      rating: 5,
      review: 'Working with Apexweb was an absolute pleasure. They understood our complex requirements and delivered a solution that not only met but exceeded our goals. Their communication throughout the project was exceptional.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, CreativeSpace',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      rating: 5,
      review: 'The level of professionalism and creativity that Apexweb brings to every project is remarkable. They helped us build a platform that our users absolutely love. Highly recommended for any serious development work.'
    },
    {
      name: 'David Thompson',
      role: 'CTO, DataFlow Systems',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      rating: 5,
      review: 'Apexweb delivered a robust, scalable solution that has been running flawlessly for over a year. Their code quality is exceptional, and their post-launch support has been outstanding. True professionals.'
    },
    {
      name: 'Lisa Wang',
      role: 'Marketing Director, BrandBoost',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      rating: 5,
      review: 'From concept to deployment, Apexweb made the entire process seamless. Their innovative approach and technical skills helped us launch ahead of schedule. The results speak for themselves - our engagement rates have tripled.'
    },
    {
      name: 'James Wilson',
      role: 'Startup Founder, NextGen Solutions',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
      rating: 5,
      review: 'Apexweb turned our ambitious idea into a market-ready product. Their expertise in modern technologies and user experience design helped us secure our first round of funding. Exceptional work!'
    }
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
        aria-hidden="true"
      />
    ));
  };

  return (
    <section id="testimonials" ref={ref} className="py-12 sm:py-16 lg:py-20 bg-navy-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-purple/5 rounded-full blur-3xl will-change-transform"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-purple/3 rounded-full blur-3xl will-change-transform"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            What Our{' '}
            <span className="text-purple">
              Clients Say
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto px-4">
            Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
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
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pr-6 sm:pr-8"
              >
                <article className="group relative bg-navy-700/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10 hover:border-purple/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="absolute inset-0 bg-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  
                  <div className="relative z-10">
                    {/* Quote Icon */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-purple/20 rounded-full flex items-center justify-center">
                      <Quote className="w-4 h-4 text-purple" aria-hidden="true" />
                    </div>

                    {/* Rating - Aligned to Right */}
                    <div className="flex items-center justify-end mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-white/80 mb-6 leading-relaxed text-sm sm:text-base italic">
                      "{testimonial.review}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={testimonial.avatar}
                          alt={`${testimonial.name}, ${testimonial.role}`}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white/20 group-hover:border-purple/50 transition-colors duration-300"
                          loading="lazy"
                          decoding="async"
                          width="48"
                          height="48"
                        />
                        <div className="absolute inset-0 rounded-full bg-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-white font-semibold text-sm sm:text-base">
                          {testimonial.name}
                        </h4>
                        <p className="text-white/60 text-xs sm:text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
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
            Ready to join our list of satisfied clients?
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
              background: 'linear-gradient(90deg, #4C1D95 0%, #312E81 100%)'
            }}
            aria-label="Start your project today - Contact us"
          >
            Start Your Project Today
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50%));
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;