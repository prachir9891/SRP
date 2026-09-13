import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import StudentDetails from './pages/StudentDetails';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/edit/:id" element={<Registration />} />
            <Route path="/student/:id" element={<StudentDetails />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
