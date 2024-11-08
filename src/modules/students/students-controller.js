const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
  const { name, className, section, roll } = req.query; // Getting query parameters for filtering
  const students = await getAllStudents({ name, className, section, roll });
  res.json(students); // Return list of students
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const payload = req.body; // Getting student data from request body
  const response = await addNewStudent(payload);
  res.status(201).json(response); // Return success message when student is added
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const payload = { ...req.body, id: req.params.id }; // Getting updated student data and adding id from URL parameter
  const response = await updateStudent(payload);
  res.json(response); // Return success message when student is updated
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params; // Getting student id from URL parameter
  const student = await getStudentDetail(id);
  res.json(student); // Return the detailed information of the student
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const { userId, reviewerId, status } = req.body; // Getting status change information from request body
  const response = await setStudentStatus({ userId, reviewerId, status });
  res.json(response); // Return success message when status is updated
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};
