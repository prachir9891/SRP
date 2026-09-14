import { NavLink } from 'react-router-dom';
import { Users, UserPlus, GraduationCap, LayoutDashboard } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GraduationCap size={20} color="white" />
        </div>
        <h2>Student Registration Portal</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard className="icon" size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/register" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <UserPlus className="icon" size={20} />
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
