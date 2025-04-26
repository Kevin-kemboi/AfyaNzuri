import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Enrollment from './components/Enrollment';
import ProgramManagement from './components/ProgramManagement';
import ClientManagement from './components/ClientManagement';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/enroll" element={<Enrollment />} />
      <Route path="/programs" element={<ProgramManagement />} />
      <Route path="/clients" element={<ClientManagement />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;