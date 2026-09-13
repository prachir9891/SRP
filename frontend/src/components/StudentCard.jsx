import './StudentCard.css';

const StudentCard = ({ student }) => {
  if (!student) return null;

  return (
    <div className="student-card glass-panel">
      <div className="card-header">
        <div className="student-avatar-lg">
          {student.profilePic ? (
            <img src={student.profilePic} alt={student.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
          ) : (
            student.name.charAt(0)
          )}
        </div>
        <div className="student-status-badge" data-status={student.status}>
          {student.status}
        </div>
      </div>
      
      <div className="card-body">
        <h3 className="student-name">{student.name}</h3>
        <p className="student-email">Father: {student.fatherName}</p>
        
        <div className="student-stats">
          <div className="stat-box">
            <span className="stat-label">Standard</span>
            <span className="stat-value">{student.standard}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Age</span>
            <span className="stat-value highlight">{student.age}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Gender</span>
            <span className="stat-value">{student.gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
