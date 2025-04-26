import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Link } from 'react-router-dom';
import { UsersIcon, HeartIcon } from '@heroicons/react/24/solid';
// Fallback: import { FaUsers, FaHeartbeat } from 'react-icons/fa';
import Header from './Header';
import enrollmentImage from '../assets/doctor-consultation.svg';

const Enrollment = () => {
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsResponse, programsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/clients'),
          axios.get('http://localhost:5000/api/programs'),
        ]);
        setClients(clientsResponse.data);
        setPrograms(programsResponse.data);
      } catch (err) {
        setError('Failed to load data. Please try again.');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClient || !selectedProgram) {
      setError('Please select a client and a program.');
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/enroll', {
        client_id: selectedClient.value,
        program_id: selectedProgram.value,
      });
      setSuccess('Enrollment successful! Welcome to the program.');
      setError('');
      setShowModal(true);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to enroll. Please try again.');
      setSuccess('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clientOptions = clients.map((client) => ({
    value: client.id,
    label: `${client.name} (ID: ${client.id})`,
  }));

  const programOptions = programs.map((program) => ({
    value: program.id,
    label: program.name,
  }));

  const selectedClientData = clients.find((client) => client.id === selectedClient?.value);
  const selectedProgramData = programs.find((program) => program.id === selectedProgram?.value);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-teal-600 min-h-screen py-16">
      <Header />
      <div className="container mx-auto px-4">
        <motion.h1
          className="font-poppins text-4xl font-bold text-gray-800 mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Enroll in Wellness Programs
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Step Indicator */}
            <div className="flex justify-between mb-6">
              <div className={`flex-1 text-center ${step >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>
                <p className="font-poppins text-base font-semibold">Step 1: Select Client</p>
                <div className={`h-1 mt-2 ${step >= 1 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
              </div>
              <div className={`flex-1 text-center ${step >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>
                <p className="font-poppins text-base font-semibold">Step 2: Select Program</p>
                <div className={`h-1 mt-2 ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
              </div>
            </div>

            {error && (
              <motion.div
                className="bg-red-100 text-red-700 p-4 rounded-lg mb-8 flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span>{error}</span>
                <button
                  onClick={() => setError('')}
                  className="text-red-700 hover:text-red-800"
                  aria-label="Clear error"
                >
                  Retry
                </button>
              </motion.div>
            )}
            {success && !showModal && (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-8">{success}</div>
            )}

            <form onSubmit={handleSubmit}>
              <motion.div
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="font-poppins text-base font-semibold text-gray-700">Select Client</label>
                <Select
                  options={clientOptions}
                  value={selectedClient}
                  onChange={(option) => {
                    setSelectedClient(option);
                    setStep(2);
                  }}
                  isDisabled={isSubmitting}
                  className="mt-1"
                  placeholder="Search clients..."
                  isSearchable
                  aria-label="Select a client"
                />
              </motion.div>
              {selectedClientData && (
                <motion.div
                  className="bg-gray-50 p-4 rounded-lg mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="font-poppins text-lg font-semibold text-teal-600 flex items-center">
                    <UsersIcon className="h-6 w-6 mr-2" />
                    {/* Fallback: <FaUsers className="text-teal-600 mr-2" /> */}
                    Client Details
                  </h3>
                  <p className="font-roboto text-base text-gray-600">Name: {selectedClientData.name}</p>
                  <p className="font-roboto text-base text-gray-600">Age: {selectedClientData.age || 'N/A'}</p>
                  <p className="font-roboto text-base text-gray-600">Gender: {selectedClientData.gender || 'N/A'}</p>
                </motion.div>
              )}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="font-poppins text-base font-semibold text-gray-700">Select Program</label>
                <Select
                  options={programOptions}
                  value={selectedProgram}
                  onChange={setSelectedProgram}
                  isDisabled={isSubmitting}
                  className="mt-1"
                  placeholder="Search programs..."
                  isSearchable
                  aria-label="Select a program"
                />
              </motion.div>
              {selectedProgramData && (
                <motion.div
                  className="bg-gray-50 p-4 rounded-lg mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="font-poppins text-lg font-semibold text-teal-600 flex items-center">
                    <HeartIcon className="h-6 w-6 mr-2" />
                    {/* Fallback: <FaHeartbeat className="text-teal-600 mr-2" /> */}
                    Program Details
                  </h3>
                  <p className="font-roboto text-base text-gray-600">Name: {selectedProgramData.name}</p>
                  <p className="font-roboto text-base text-gray-600">Description: {selectedProgramData.description || 'N/A'}</p>
                </motion.div>
              )}
              <motion.button
                type="submit"
                className="bg-teal-600 text-white font-poppins text-base font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Enrolling...
                  </span>
                ) : (
                  'Enroll Client'
                )}
              </motion.button>
            </form>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={enrollmentImage} alt="Enrollment illustration" className="max-w-full h-auto" />
          </motion.div>
        </div>

        {/* Success Modal with Confetti */}
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} />
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-poppins text-2xl font-semibold text-gray-800 mb-4">Success!</h2>
              <p className="font-roboto text-base text-gray-600 mb-6">{success}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-coral-500 text-white font-poppins text-base font-semibold py-2 px-6 rounded-lg hover:bg-coral-600 transition-colors"
                >
                  Close
                </button>
                <Link
                  to="/dashboard"
                  className="bg-teal-600 text-white font-poppins text-base font-semibold py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  View Dashboard
                </Link>
              </div>
            </motion.div>
          </motion.div>
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
                <li><Link to="/programs" className="font-roboto text-base hover:text-teal-400">Programs</Link></li>
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

export default Enrollment;