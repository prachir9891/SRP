import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon"></div>
        <h2>Student Registration Portal</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">📊</span>
          All Students
        </NavLink>
        <NavLink to="/register" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">📝</span>
          Registration
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">A</div>
          <div className="user-details">
            <span className="user-name">Admin User</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
