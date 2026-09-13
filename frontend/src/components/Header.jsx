import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      try {
        const { data: students } = await axios.get('http://localhost:5000/api/students');
        const student = students.find(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (student) {
          navigate(`/student/${student.id}`);
          setSearchTerm('');
        } else {
          alert('Student not found!');
        }
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  };
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'All Students';
      case '/register': return 'Student Registration';
      default:
        if (location.pathname.startsWith('/student/')) return 'Student Profile';
        return 'Overview';
    }
  };

  return (
    <header className="header glass-panel">
      <div className="header-title">
        <h1>{getPageTitle()}</h1>
      </div>
      
      <div className="header-actions">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <button className="notification-btn">
          <span className="bell-icon">🔔</span>
          <span className="badge">3</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
