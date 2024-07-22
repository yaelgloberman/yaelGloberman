// services/student.service.js
import { studentsAPI } from './axios'; // Adjust the path if needed

export const getStudentById = async (id) => {
  try {
    const response = await studentsAPI.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    throw error;
  }
};

export const getAllStudents = async () => {
  try {
    const response = await studentsAPI.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all students:', error);
    throw error;
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await studentsAPI.post('/', studentData);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const assignStudentToClass = async (id, classId) => {
  try {
    const response = await studentsAPI.put(`/${id}/${classId}`);
    return response.data;
  } catch (error) {
    console.error('Error assigning student to class:', error);
    throw error;
  }
};
export const getAllStudentsInClass = async (classId) => {
  try {
    const response = await studentsAPI.get(`/allStudentInClass/${classId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all students:', error);
    throw error;
  }
};

