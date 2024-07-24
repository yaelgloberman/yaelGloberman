// services/classes.service.js
import { classesAPI } from './axios'; // Adjust the path if needed

export const getClassById = async (id) => {
  try {
    const response = await classesAPI.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching class by ID:', error);
    throw error;
  }
};

export const getAllClasses = async () => {
  try {
    const response = await classesAPI.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all classes:', error);
    throw error;
  }
};

export const getAvailableClasses = async () => {
  try {
    const response = await classesAPI.get('/availableClasses');
    return response.data;
  } catch (error) {
    console.error('Error fetching available classes:', error);
    throw error;
  }
};

export const createClass = async (classData) => {
  try {
    const response = await classesAPI.post('/', classData);
    return response.data;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

export const assignToClass = async (id) => {
  try {
    const response = await classesAPI.post(`/${id}/assign`);
    return response.data;
  } catch (error) {
    console.error('Error assigning to class:', error);
    throw error;
  }
};

export const dismissFromClass = async (id) => {
  try {
    const response = await classesAPI.post(`/${id}/dismiss`);
    return response.data;
  } catch (error) {
    console.error('Error dismissing from class:', error);
    throw error;
  }
};
export const deleteStudentFromClass = async (classId,studentId) => {
  try {
    const response = await classesAPI.put(`/${classId}/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error dismissing from class:', error);
    throw error;
  }
};


export const deleteClassApi = async (id) => {
  try {
    const response = await classesAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
};

