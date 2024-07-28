import { studentsAPI } from './axios'; 

export const getAllStudentsApi = async () => {
  try {
    const response = await studentsAPI.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all students:', error);
    throw error;
  }
};

export const createStudentApi = async (studentData) => {
  try {
    const response = await studentsAPI.post('/', studentData);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const assignStudentToClassApi = async (id, classId) => {
  try {
    const response = await studentsAPI.put(`/${id}/${classId}`);
    return response.data;
  } catch (error) {
    console.error('Error assigning student to class:', error);
    throw error;
  }
};
export const getAllStudentsInClassApi = async (classId) => {
  try {
    const response = await studentsAPI.get(`/allStudentInClass/${classId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all students:', error);
    throw error;
  }
};
export const deleteStudentApi = async (id) => {
  try {
    const response = await studentsAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error delete student:', error);
    throw error;
  }
};

