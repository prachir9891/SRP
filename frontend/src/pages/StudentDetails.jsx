import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import StudentCard from '../components/StudentCard';
import './StudentDetails.css';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await api.get(`/students/${id}`);
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <div className="student-details-page"><h2>Loading...</h2></div>;

  if (!student) {
    return (
      <div className="not-found">
        <h2>Student not found</h2>
        <button onClick={() => navigate('/dashboard')} className="btn-secondary">Go Back</button>
      </div>
    );
  }

  return (
    <div className="student-details-page">
      <div className="page-header">
        <button onClick={() => navigate('/dashboard')} className="btn-back">
          ← Back to All Students
        </button>
      </div>
      
      <div className="details-grid">
        <div className="details-sidebar">
          <StudentCard student={student} />
        </div>
        
        <div className="details-content glass-panel">
          <h3>Admission Details</h3>
          <div className="record-list">
            <div className="record-item">
              <span className="record-label">Previous School</span>
              <span className="record-value">{student.previousSchool || 'N/A'}</span>
            </div>
            <div className="record-item">
              <span className="record-label">Enrollment Date</span>
              <span className="record-value">{new Date(student.enrollmentDate).toLocaleDateString()}</span>
            </div>
            <div className="record-item">
              <span className="record-label">Status</span>
              <span className="record-value">{student.status}</span>
            </div>
          </div>

          <h3 className="mt-6">Recent Activity</h3>
          <ul className="activity-timeline">
            <li>
              <div className="timeline-date">{new Date(student.enrollmentDate).toLocaleDateString()}</div>
              <div className="timeline-desc">Student record created in portal</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
