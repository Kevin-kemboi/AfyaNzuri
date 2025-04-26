import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { HeartIcon, ArrowUpIcon, ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
// Fallback: import { FaHeartbeat, FaRunning, FaAppleAlt, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Header from './Header';

const ProgramManagement = () => {
  const [programs, setPrograms] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const programsPerPage = 6;

  const categories = ['Fitness', 'Nutrition', 'Mental Health', 'General Wellness'];

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/programs');
        setPrograms(response.data);
      } catch (err) {
        setError('Failed to fetch programs.');
      }
    };
    fetchPrograms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
      setError('Program name must be at least 3 characters.');
      return;
    }
    if (description.length > 200) {
      setError('Description cannot exceed 200 characters.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/programs', { name, description, category });
      setSuccess('Program added successfully!');
      setError('');
      setName('');
      setDescription('');
      setCategory('');
      const response = await axios.get('http://localhost:5000/api/programs');
      setPrograms(response.data);
    } catch (err) {
      setError('Failed to add program.');
      setSuccess('');
    }
  };

  const exportToCSV = () => {
    const csv = [
      'ID,Name,Description,Category',
      ...programs.map((program) => `${program.id},${program.name},${program.description || ''},${program.category || ''}`),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'programs.csv');
  };

  const filteredPrograms = programs.filter(
    (program) =>
      program.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filterCategory || program.category === filterCategory)
  );

  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);
  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);

  const categoryIcons = {
    Fitness: <ArrowUpIcon className="h-6 w-6 text-teal-600 mr-2" />,
    Nutrition: <ArrowDownIcon className="h-6 w-6 text-teal-600 mr-2" />,
    'Mental Health': <HeartIcon className="h-6 w-6 text-teal-600 mr-2" />,
    'General Wellness': <HeartIcon className="h-6 w-6 text-teal-600 mr-2" />,
  };
  // Fallback for react-icons:
  // const categoryIcons = {
  //   Fitness: <FaRunning className="text-teal-600 mr-2" />,
  //   Nutrition: <FaAppleAlt className="text-teal-600 mr-2" />,
  //   'Mental Health': <FaHeartbeat className="text-teal-600 mr-2" />,
  //   'General Wellness': <FaHeartbeat className="text-teal-600 mr-2" />,
  // };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <Header />
      <div className="container mx-auto px-4">
        <motion.h1
          className="font-poppins text-4xl font-bold text-gray-800 mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Wellness Programs
        </motion.h1>
        {error && (
          <motion.div
            className="bg-red-100 text-red-700 p-4 rounded-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            className="bg-green-100 text-green-700 p-4 rounded-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {success}
          </motion.div>
        )}

        {/* Program Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4">
            <label className="font-poppins text-base font-semibold text-gray-700">Program Name</label>
            <input
              type="text"
              className="mt-1 w-full border-mint-green-300 rounded-lg p-3 font-roboto text-base focus:border-teal-600 focus:ring focus:ring-teal-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={50}
              aria-label="Program name"
            />
            <p className="font-roboto text-sm text-gray-500 mt-1">{name.length}/50 characters</p>
          </div>
          <div className="mb-4">
            <label className="font-poppins text-base font-semibold text-gray-700">Description</label>
            <textarea
              className="mt-1 w-full border-mint-green-300 rounded-lg p-3 font-roboto text-base focus:border-teal-600 focus:ring focus:ring-teal-200"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              maxLength={200}
              aria-label="Program description"
            ></textarea>
            <p className="font-roboto text-sm text-gray-500 mt-1">{description.length}/200 characters</p>
          </div>
          <div className="mb-4">
            <label className="font-poppins text-base font-semibold text-gray-700">Category</label>
            <select
              className="mt-1 w-full border-mint-green-300 rounded-lg p-3 font-roboto text-base focus:border-teal-600 focus:ring focus:ring-teal-200"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Program category"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <motion.button
            type="submit"
            className="bg-teal-600 text-white font-poppins text-base font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Program
          </motion.button>
        </motion.form>

        {/* Search and Filter */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            className="flex-1 border-mint-green-300 rounded-lg p-3 font-roboto text-base focus:border-teal-600 focus:ring focus:ring-teal-200"
            placeholder="Search programs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search programs"
          />
          <select
            className="border-mint-green-300 rounded-lg p-3 font-roboto text-base focus:border-teal-600 focus:ring focus:ring-teal-200"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={exportToCSV}
            className="bg-coral-500 text-white font-poppins text-base font-semibold py-3 px-4 rounded-lg hover:bg-coral-600 transition-colors flex items-center"
          >
            <ArrowDownIcon className="h-5 w-5 mr-2" />
            {/* Fallback: <FaDownload className="mr-2" /> */}
            Export CSV
          </button>
        </motion.div>

        {/* Program List */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          initial="hidden"
          animate="visible"
        >
          {currentPrograms.length > 0 ? (
            currentPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                className={`relative bg-white border-2 border-mint-green-300 rounded-lg shadow-lg overflow-hidden group ${index === 0 ? 'lg:col-span-2' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-coral-500 text-white font-poppins text-sm font-semibold px-3 py-1 rounded-bl-lg">
                    Featured
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    {categoryIcons[program.category] || <HeartIcon className="h-6 w-6 text-teal-600 mr-2" />}
                    {/* Fallback: {categoryIcons[program.category] || <FaHeartbeat className="text-teal-600 mr-2" />} */}
                    <h3 className="font-poppins text-xl font-semibold text-gray-800">{program.name}</h3>
                  </div>
                  <p className="font-roboto text-base text-gray-600 mb-4">{program.description || 'No description'}</p>
                  {program.category && (
                    <span className="inline-block bg-teal-100 text-teal-600 font-roboto text-sm px-2 py-1 rounded">
                      {program.category}
                    </span>
                  )}
                  <Link
                    to="/enroll"
                    className="mt-4 inline-block bg-teal-600 text-white font-poppins text-base font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Join Now
                  </Link>
                </div>
                <div className="absolute inset-0 bg-teal-600 bg-opacity-90 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-roboto text-white text-base p-6">
                    Join {program.name} to start your wellness journey today!
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full font-roboto text-base text-gray-600">No programs found</p>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-teal-600 hover:text-teal-700 disabled:opacity-50"
              aria-label="Previous page"
            >
              <ChevronLeftIcon className="h-6 w-6" />
              {/* Fallback: <FaChevronLeft size={24} /> */}
            </button>
            <span className="font-roboto text-base text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-teal-600 hover:text-teal-700 disabled:opacity-50"
              aria-label="Next page"
            >
              <ChevronRightIcon className="h-6 w-6" />
              {/* Fallback: <FaChevronRight size={24} /> */}
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-navy-700 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <li><Link to="/enroll" className="font-roboto text-base hover:text-teal-400">Enroll</Link></li>
                <li><Link to="/dashboard" className="font-roboto text-base hover:text-teal-400">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-poppins text-xl font-semibold mb-4">Contact Us</h3>
              <p className="font-roboto text-base">Email: support@healthhub.com</p>
              <p className="font-roboto text-base">Phone: (123) 456-7890</p>
            </div>
          </div>
          <p className="text-center font-roboto text-sm mt-8">© 2025 Health Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProgramManagement;