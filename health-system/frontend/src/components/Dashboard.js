import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/solid';
// Fallback: import { FaHeartbeat, FaUsers, FaChartBar } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Header from './Header';

const Dashboard = () => {
  const [stats, setStats] = useState({ clients: 0, programs: 0, enrollments: 0 });
  const [categoryData, setCategoryData] = useState([]);
  const [enrollmentTrend, setEnrollmentTrend] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsResponse, programsResponse, enrollmentsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/clients'),
          axios.get('http://localhost:5000/api/programs'),
          axios.get('http://localhost:5000/api/enrollments'),
        ]);

        const clients = clientsResponse.data;
        const programs = programsResponse.data;
        const enrollments = enrollmentsResponse.data;

        // Overall stats
        setStats({
          clients: clients.length,
          programs: programs.length,
          enrollments: enrollments.length,
        });

        // Category distribution
        const categoryCounts = programs.reduce((acc, program) => {
          const category = program.category || 'Uncategorized';
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        setCategoryData(
          Object.entries(categoryCounts).map(([name, value]) => ({ name, value }))
        );

        // Enrollment trend (mock data by month, adjust based on backend data)
        const trendData = enrollments.reduce((acc, enrollment) => {
          const date = new Date(enrollment.date || Date.now());
          const month = date.toLocaleString('default', { month: 'short' });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});
        setEnrollmentTrend(
          Object.entries(trendData).map(([name, count]) => ({ name, count }))
        );
      } catch (err) {
        setError('Failed to load dashboard data.');
      }
    };
    fetchData();
  }, []);

  const COLORS = ['#1aa7ec', '#ff6f61', '#a3e4d7', '#2d3748'];

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
          Dashboard
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <UsersIcon className="h-10 w-10 text-teal-600 mb-4 mx-auto" />
            {/* Fallback: <FaUsers className="text-teal-600 text-4xl mb-4 mx-auto" /> */}
            <h3 className="font-poppins text-2xl font-semibold text-gray-800">{stats.clients}</h3>
            <p className="font-roboto text-base text-gray-600">Total Clients</p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <HeartIcon className="h-10 w-10 text-teal-600 mb-4 mx-auto" />
            {/* Fallback: <FaHeartbeat className="text-teal-600 text-4xl mb-4 mx-auto" /> */}
            <h3 className="font-poppins text-2xl font-semibold text-gray-800">{stats.programs}</h3>
            <p className="font-roboto text-base text-gray-600">Total Programs</p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ChartBarIcon className="h-10 w-10 text-teal-600 mb-4 mx-auto" />
            {/* Fallback: <FaChartBar className="text-teal-600 text-4xl mb-4 mx-auto" /> */}
            <h3 className="font-poppins text-2xl font-semibold text-gray-800">{stats.enrollments}</h3>
            <p className="font-roboto text-base text-gray-600">Total Enrollments</p>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="font-poppins text-xl font-semibold text-gray-800 mb-4 text-center">
              Program Categories
            </h3>
            <PieChart width={400} height={300}>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h3 className="font-poppins text-xl font-semibold text-gray-800 mb-4 text-center">
              Enrollment Trend
            </h3>
            <BarChart width={400} height={300} data={enrollmentTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1aa7ec" />
            </BarChart>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Link
            to="/enroll"
            className="bg-teal-600 text-white font-poppins text-lg font-semibold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors inline-block"
          >
            Enroll More Clients
          </Link>
        </motion.div>
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
                <li><Link to="/enroll" className="font-roboto text-base hover:text-teal-400">Enroll</Link></li>
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

export default Dashboard;