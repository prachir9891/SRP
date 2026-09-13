import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import FormInput from '../components/FormInput';
import './Registration.css';
const Registration = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    standard: '',
    age: '',
    gender: 'Male',
    previousSchool: '',
    profilePic: ''
  });

  useEffect(() => {
    if (id) {
      api.get(`/students/${id}`)
        .then(({ data }) => {
          setFormData({
            name: data.name || '',
            fatherName: data.fatherName || '',
            standard: data.standard || '',
            age: data.age || '',
            gender: data.gender || 'Male',
            previousSchool: data.previousSchool || '',
            profilePic: data.profilePic || ''
          });
        })
        .catch(err => console.error('Error fetching student details:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/students/${id}`, formData);
      } else {
        await api.post('/students', formData);
      }
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container glass-panel">
        <div className="form-header">
          <h2>{id ? 'Edit Student Details' : 'New Student Enrollment'}</h2>
          <p>{id ? 'Update the details below for the selected student.' : 'Please fill out the form below to register a new student to the portal.'}</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-grid">
            <FormInput 
              label="Student Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g. Rahul Kumar"
              required 
            />
            <FormInput 
              label="Father's Name" 
              name="fatherName" 
              value={formData.fatherName} 
              onChange={handleChange} 
              placeholder="e.g. Anil Kumar"
              required 
            />
            <FormInput 
              label="Standard (Class)" 
              name="standard" 
              value={formData.standard} 
              onChange={handleChange} 
              placeholder="e.g. 5th"
              required 
            />
            <FormInput 
              label="Age" 
              name="age" 
              type="number"
              value={formData.age} 
              onChange={handleChange} 
              placeholder="e.g. 10"
              required 
            />
            <div className="input-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="form-input">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <FormInput 
              label="Previous School Name" 
              name="previousSchool" 
              value={formData.previousSchool} 
              onChange={handleChange} 
              placeholder="e.g. DPS School"
            />
            <FormInput 
              label="Profile Picture URL (Optional)" 
              name="profilePic" 
              value={formData.profilePic} 
              onChange={handleChange} 
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-lg">
              {id ? 'Update Details' : 'Register Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
