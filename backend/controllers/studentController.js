import Student from '../models/studentModel.js';

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find({}).sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const createdStudent = await student.save();
    res.status(201).json(createdStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      Object.assign(student, req.body);
      const updatedStudent = await student.save();
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      await student.deleteOne();
      res.json({ message: 'Student removed' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
