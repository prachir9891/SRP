import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import * as XLSX from 'xlsx';
import api from '../api';
import StudentTable from '../components/StudentTable';
import './Dashboard.css';

const Dashboard = () => {
  const [studentData, setStudentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get('/students');
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.delete(`/students/${id}`);
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

  const filteredStudents = studentData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToExcel = () => {
    const exportData = studentData.map(student => ({
      'ID': student.id,
      'Name': student.name,
      'Father Name': student.fatherName,
      'Standard': student.standard,
      'Age': student.age,
      'Gender': student.gender,
      'Previous School': student.previousSchool || 'N/A',
      'Status': student.status,
      'Enrollment Date': student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "Student_Registration_Data.xlsx");
  };

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
          <div className="section-title-wrap">
            <h2>All Students</h2>
            <div className="dashboard-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button className="btn-primary" onClick={exportToExcel}>Export Data</button>
        </div>
        <StudentTable students={filteredStudents} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Dashboard;
