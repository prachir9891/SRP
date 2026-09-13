import { useNavigate } from 'react-router-dom';
import './StudentTable.css';

const StudentTable = ({ students, onUpdate, onDelete }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/student/${id}`);
  };

  return (
    <div className="table-container glass-panel">
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Father's Name</th>
            <th>Standard</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} onClick={() => handleRowClick(student.id)}>
              <td>
                <div className="table-user-cell">
                  <div className="table-avatar">
                    {student.profilePic ? (
                      <img src={student.profilePic} alt={student.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                    ) : (
                      student.name.charAt(0)
                    )}
                  </div>
                  <div className="table-user-info">
                    <span className="table-user-name">{student.name}</span>
                    <span className="table-user-email">{student.previousSchool}</span>
                  </div>
                </div>
              </td>
              <td>{student.fatherName}</td>
              <td>{student.standard}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>
                <span className="status-indicator" data-status={student.status}>
                  {student.status}
                </span>
              </td>
              <td>
                <button 
                  className="btn-secondary" 
                  style={{marginRight: '8px', padding: '4px 8px', fontSize: '0.8rem'}}
                  onClick={(e) => { e.stopPropagation(); onUpdate && onUpdate(student.id); }}>
                  Edit
                </button>
                <button 
                  className="btn-danger" 
                  style={{padding: '4px 8px', fontSize: '0.8rem', backgroundColor: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '4px', cursor: 'pointer'}}
                  onClick={(e) => { e.stopPropagation(); onDelete && onDelete(student.id); }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="7" className="empty-state">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
