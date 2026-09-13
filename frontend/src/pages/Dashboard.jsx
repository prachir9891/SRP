import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentTable from '../components/StudentTable';
import './Dashboard.css';

const Dashboard = () => {
  const [studentData, setStudentData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/students');
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        setStudentData(studentData.filter(s => s.id !== id));
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit/${id}`);
  };

  const stats = [
    { label: "Total Students", value: studentData.length, color: "var(--accent-color)" },
    { label: "Active", value: studentData.filter(s => s.status === 'Active').length, color: "var(--success)" },
    { label: "Pending", value: studentData.filter(s => s.status === 'Pending').length, color: "var(--warning)" },
  ];

  return (
    <div className="dashboard-page">
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card glass-panel" style={{ '--stat-color': stat.color }}>
            <div className="stat-card-label">{stat.label}</div>
            <div className="stat-card-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>All Students</h2>
          <button className="btn-primary">Export CSV</button>
        </div>
        <StudentTable students={studentData} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Dashboard;
