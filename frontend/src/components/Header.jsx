import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/register': return 'Student Registration';
      default:
        if (location.pathname.startsWith('/student/')) return 'Student Profile';
        return 'Overview Dashboard';
    }
  };

  return (
    <header className="header glass-panel">
      <div className="header-title">
        <h1>{getPageTitle()}</h1>
      </div>
    </header>
  );
};

export default Header;
