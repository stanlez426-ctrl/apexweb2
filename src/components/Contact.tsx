import React, { useState, useCallback, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, RefreshCw } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  href: string;
}

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Memoized contact info to prevent unnecessary re-renders
  const contactInfo: ContactInfo[] = useMemo(() => [
    {
      icon: Mail,
      title: 'Email',
      content: 'nexora.contacts@gmail.com',
      href: 'mailto:apexweb19@gmail.com'
    },
    {
      icon: Whatsapp,
      title: 'Whatsapp',
      content: '+1(956) 246-3140',
      href: 'https://wa.me/19562463140'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'USA, UK & Canada',
      href: '#'
    }
  ], []);

  // Optimized input sanitization
  const sanitizeInput = useCallback((input: string): string => {
  return input.replace(/[<>]/g, ''); // Don't trim here
}, []);

  // Enhanced validation with better error messages
  const validateForm = useCallback((data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    // Name validation
    const name = data.name.trim();
    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (name.length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Email validation
    const email = data.email.trim();
    if (!email) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email address';
      } else if (email.length > 100) {
        newErrors.email = 'Email must be less than 100 characters';
      }
    }

    // Subject validation
    const subject = data.subject.trim();
    if (!subject) {
      newErrors.subject = 'Subject is required';
    } else if (subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    } else if (subject.length > 100) {
      newErrors.subject = 'Subject must be less than 100 characters';
    }

    // Message validation
    const message = data.message.trim();
    if (!message) {
      newErrors.message = 'Message is required';
    } else if (message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (message.length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    return newErrors;
  }, []);

  // Optimized input change handler
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors, sanitizeInput]);

  const submitToAPI = useCallback(async (data: FormData) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch('http://localhost:3000/api/contact/post/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 422 && responseData.errors) {
          // Handle validation errors from server
          const serverErrors: FormErrors = {};
          responseData.errors.forEach((err: { param: string; msg: string }) => {
            serverErrors[err.param] = err.msg;
          });
          throw { type: 'validation', errors: serverErrors };
        } else if (response.status >= 500) {
          throw { type: 'server', message: 'Server error. Please try again later.' };
        } else {
          throw { type: 'client', message: responseData.message || 'Something went wrong. Please try again.' };
        }
      }

      return {
        success: true,
        message: responseData.message || 'Message sent successfully! We\'ll get back to you within 24 hours.'
      };
    } catch (error: any) {
      clearTimeout(timeoutId);      
      if (error.name === 'AbortError') {
        throw { type: 'timeout', message: 'Request timed out. Please check your connection and try again.' };
      }
      
      if (error.type) {
        throw error;
      }
      
      // Network or other errors
      throw { 
        type: 'network', 
        message: 'Network error. Please check your connection and try again.' 
      };
    }
  }, []);

  // Optimized form submission handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus on first error field
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      element?.focus();
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitMessage('');

    try {
      const result = await submitToAPI(formData);
      setIsSubmitted(true);
      setSubmitMessage(result.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('Form submission error:', error);
      
      if (error.type === 'validation' && error.errors) {
        setErrors(error.errors);
      } else {
        setSubmitMessage(error.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, submitToAPI]);

  // Reset form handler
  const resetForm = useCallback(() => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setIsSubmitted(false);
    setSubmitMessage('');
  }, []);

  return (
    <section id="contact" ref={ref} className="py-12 sm:py-16 lg:py-20 bg-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-800"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Let's Build Something{' '}
            <span className="text-purple">
              Amazing Together
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto px-4">
            Ready to transform your ideas into reality? Get in touch and let's discuss your next project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Get in Touch</h3>
              <p className="text-white/80 leading-relaxed mb-6 sm:mb-8">
                We'd love to hear from you. Whether you have a project in mind or just want to chat
                about possibilities, don't hesitate to reach out.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="cursor-pointer flex items-center space-x-4 p-4 bg-navy-700/30 rounded-lg border border-white/10 hover:border-purple/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple/20 rounded-lg flex items-center justify-center">
                    <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">{info.title}</h4>
                    <a
                      href={info.href}
                      className="text-white/80 hover:text-purple transition-colors duration-200 text-sm sm:text-base"
                      aria-label={`${info.title}: ${info.content}`}
                    >
                      {info.content}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-navy-700/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 sm:py-12"
              >
                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/80 mb-6">{submitMessage || 'Thank you for reaching out. We\'ll get back to you soon.'}</p>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center px-4 py-2 text-purple hover:text-white border border-purple hover:bg-purple rounded-lg transition-colors duration-200"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2 text-sm sm:text-base">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-navy-600/50 border ${
                        errors.name ? 'border-red-500' : 'border-white/20'
                      } rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple transition-colors duration-200 text-sm sm:text-base`}
                      placeholder="Your name"
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-400 text-xs sm:text-sm mt-1" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2 text-sm sm:text-base">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-navy-600/50 border ${
                        errors.email ? 'border-red-500' : 'border-white/20'
                      } rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple transition-colors duration-200 text-sm sm:text-base`}
                      placeholder="your@email.com"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-400 text-xs sm:text-sm mt-1" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-navy-600/50 border ${
                      errors.subject ? 'border-red-500' : 'border-white/20'
                    } rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple transition-colors duration-200 text-sm sm:text-base`}
                    placeholder="Project inquiry"
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="text-red-400 text-xs sm:text-sm mt-1" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-navy-600/50 border ${
                      errors.message ? 'border-red-500' : 'border-white/20'
                    } rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple transition-colors duration-200 resize-none text-sm sm:text-base`}
                    placeholder="Tell us about your project..."
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={errors.message ? 'true' : 'false'}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-400 text-xs sm:text-sm mt-1" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {submitMessage && !isSubmitted && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-300 text-sm">{submitMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
                  style={{
                    background: 'linear-gradient(90deg, #4C1D95 0%, #312E81 100%)'
                  }}
                  aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                >
                  <span className="flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" aria-hidden="true"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
