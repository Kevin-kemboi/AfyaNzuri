import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import { UserIcon, HeartIcon, UsersIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
// Fallback: import { FaUserMd, FaHeartbeat, FaUsers, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Header from './Header';
import heroImage from '../assets/healthcare-hero.svg';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    { name: 'Sarah L.', text: 'The Fitness Bootcamp transformed my life with expert guidance!' },
    { name: 'Mike R.', text: 'Nutrition Plan was tailored perfectly to my needs.' },
    { name: 'Emily T.', text: 'Mental Health program gave me tools to thrive.' },
  ];

  useEffect(() => {
    const typed = new Typed('#typed-text', {
      strings: ['Healthier Lives', 'Wellness Goals', 'Your Best Self'],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-mint-green-300 text-white py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6">
              Achieve <span id="typed-text"></span>
            </h1>
            <p className="font-roboto text-lg md:text-xl mb-8">
              Join our wellness programs to transform your health with expert guidance.
            </p>
            <Link
              to="/enroll"
              className="bg-coral-500 text-white font-poppins text-lg font-semibold py-3 px-8 rounded-lg hover:bg-coral-600 transition-colors inline-block"
            >
              Start Your Journey
            </Link>
          </motion.div>
          <motion.div
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={heroImage} alt="Healthcare hero" className="max-w-full h-auto" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins text-3xl font-bold text-gray-800 text-center mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-50 p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <UserIcon className="h-10 w-10 text-teal-600 mb-4 mx-auto" />
              {/* Fallback: <FaUserMd className="text-teal-600 text-4xl mb-4 mx-auto" /> */}
              <h3 className="font-poppins text-2xl font-semibold text-gray-800">500+</h3>
              <p className="font-roboto text-base text-gray-600">Satisfied Clients</p>
            </motion.div>
            <motion.div
              className="bg-gray-50 p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <HeartIcon className="h-10 w-10 text-teal-600 mb-4 mx-auto" />
              {/* Fallback: <FaHeartbeat className="text-teal-600 text-4xl mb-4 mx-auto" /> */}
              <h3 className="font-poppins text-2xl font-semibold text-gray-800">20+</h3>
              <p className="font-roboto text-base text-gray-600">Wellness Programs</p>
            </motion.div>
            <motion.div
              className="bg-gray-50 p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <UsersIcon className="h-10 w-10 text-teal-600 mb-4 mx-auto" />
              {/* Fallback: <FaUsers className="text-teal-600 text-4xl mb-4 mx-auto" /> */}
              <h3 className="font-poppins text-2xl font-semibold text-gray-800">10+</h3>
              <p className="font-roboto text-base text-gray-600">Expert Coaches</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-mint-green-300 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins text-3xl font-bold text-gray-800 text-center mb-12">
            Hear From Our Community
          </h2>
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto relative"
            key={currentTestimonial}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-roboto text-base text-gray-600 mb-4 italic">
              "{testimonials[currentTestimonial].text}"
            </p>
            <p className="font-poppins text-lg font-semibold text-teal-600">
              - {testimonials[currentTestimonial].name}
            </p>
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-teal-600 hover:text-teal-700"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="h-6 w-6" />
              {/* Fallback: <FaChevronLeft size={24} /> */}
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-teal-600 hover:text-teal-700"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="h-6 w-6" />
              {/* Fallback: <FaChevronRight size={24} /> */}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-poppins text-xl font-semibold mb-4 flex items-center">
                <HeartIcon className="h-6 w-6 text-teal-400 mr-2" />
                {/* Fallback: <FaHeartbeat className="text-teal-400 mr-2" /> */}
                Health Hub
              </h3>
              <p className="font-roboto text-base">Empowering healthier lives through trusted care.</p>
            </div>
            <div>
              <h3 className="font-poppins text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="font-roboto text-base hover:text-teal-400">Home</Link></li>
                <li><Link to="/programs" className="font-roboto text-base hover:text-teal-400">Programs</Link></li>
                <li><Link to="/enroll" className="font-roboto text-base hover:text-teal-400">Enroll</Link></li>
                <li><Link to="/clients" className="font-roboto text-base hover:text-teal-400">Clients</Link></li>
                <li><Link to="/dashboard" className="font-roboto text-base hover:text-teal-400">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-poppins text-xl font-semibold mb-4">Contact Us</h3>
              <p className="font-roboto text-base">Email: support@healthhub.com</p>
              <p className="font-roboto text-base">Phone: (123) 456-7890</p>
              <p className="font-roboto text-base">Address: 123 Wellness St, Health City</p>
            </div>
            <div>
              <h3 className="font-poppins text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://twitter.com" className="text-teal-400 hover:text-teal-300" aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="https://facebook.com" className="text-teal-400 hover:text-teal-300" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://instagram.com" className="text-teal-400 hover:text-teal-300" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.981-6.98.058-1.281.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.981-6.981C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <p className="text-center font-roboto text-sm mt-8">© 2025 Health Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;