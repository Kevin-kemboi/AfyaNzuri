import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/solid';
// Fallback: import { FaUser } from 'react-icons/fa';
import Header from './Header';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/clients');
        setClients(response.data);
      } catch (err) {
        setError('Failed to fetch clients');
      }
    };
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('Name is required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/clients', {
        name,
        age: age ? parseInt(age) : null,
        gender,
        contact,
      });
      setSuccess(`Client added: ${response.data.client_id}`);
      setError('');
      setName('');
      setAge('');
      setGender('');
      setContact('');
      const clientsResponse = await axios.get('http://localhost:5000/api/clients');
      setClients(clientsResponse.data);
    } catch (err) {
      setError('Failed to add client');
      setSuccess('');
    }
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

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
          Manage Clients
        </motion.h1>
        {error && (
          <motion.div
            className="bg-red-100 text-red-700 p-4 rounded-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            className="bg-green-100 text-green-700 p-4 rounded-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {success}
          </motion.div>
        )}

        {/* Add Client Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-poppins text-base font-semibold text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 w-full border-mint-green-300 rounded-lg p-3 font-roboto text-base focus:border-teal-600 focus:ring focus:ring-teal-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-label="Client name"
              />
            </div>
            <div>
              <label className="font-poppins text-base font-semibold text-gray-700">Age</label>
              <input
                type="number"
                className="mt-1 w-full border-mint-green-300 rounded-lg p-3 font-roboto text-base focus:border-teal-600 focus:ring focus:ring-teal-200"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="0"
                aria-label="Client age"
              />
            </div>
            <div>
              <label className="font-poppins text-base font-semibold text-gray-700">Gender</label>
              <select
                className="mt-1 w-full border-mint-green-300 rounded-lg p-3 font-roboto text-base focus:border-teal-600 focus:ring focus:ring-teal-200"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                aria-label="Client gender"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="font-poppins text-base font-semibold text-gray-700">Contact</label>
              <input
                type="text"
                className="mt-1 w-full border-mint-green-300 rounded-lg p-3 font-roboto text-base focus:border-teal-600 focus:ring focus:ring-teal-200"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                aria-label="Client contact"
              />
            </div>
          </div>
          <motion.button
            type="submit"
            className="mt-6 bg-teal-600 text-white font-poppins text-base font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Client
          </motion.button>
        </motion.form>

        {/* Search Bar */}
        <motion.div
          className="mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            className="w-full border-mint-green-300 rounded-lg p-3 font-roboto text-base focus:border-teal-600 focus:ring focus:ring-teal-200"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search clients"
          />
        </motion.div>

        {/* Client List */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          initial="hidden"
          animate="visible"
        >
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <motion.div
                key={client.id}
                className="bg-white p-6 rounded-lg shadow-lg"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex items-center mb-2">
                  <UserIcon className="h-6 w-6 text-teal-600 mr-2" />
                  {/* Fallback: <FaUser className="text-teal-600 mr-2" /> */}
                  <h3 className="font-poppins text-xl font-semibold text-gray-800">{client.name}</h3>
                </div>
                <p className="font-roboto text-base text-gray-600 mb-4">
                  {client.contact || 'No contact provided'}
                </p>
                <p className="font-roboto text-sm text-gray-500">
                  <strong>Age:</strong> {client.age || 'N/A'} | <strong>Gender:</strong> {client.gender || 'N/A'}
                </p>
                <Link
                  to="/enroll"
                  className="mt-4 inline-block text-teal-600 font-poppins text-base font-semibold hover:underline"
                >
                  Enroll Client
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full font-roboto text-base text-gray-600">No clients found</p>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-navy-700 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-poppins text-xl font-semibold mb-4 flex items-center">
                <UserIcon className="h-6 w-6 text-teal-400 mr-2" />
                {/* Fallback: <FaUser className="text-teal-400 mr-2" /> */}
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

export default ClientManagement;