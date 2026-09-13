import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  standard: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  previousSchool: { type: String },
  profilePic: { type: String },
  enrollmentDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Active' },
}, {
  timestamps: true
});

// For frontend compatibility we need to return 'id' instead of '_id'
studentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
