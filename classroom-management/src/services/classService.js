import { classesAPI } from './axios'; 

export const getAllClassesApi = async () => {
  try {
    const response = await classesAPI.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all classes:', error);
    throw error;
  }
};

export const getAvailableClassesApi = async () => {
  try {
    const response = await classesAPI.get('/availableClasses');
    return response.data;
  } catch (error) {
    console.error('Error fetching available classes:', error);
    throw error;
  }
};

export const createClassApi = async (classData) => {
  try {
    const response = await classesAPI.post('/', classData);
    return response.data;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

export const deleteStudentFromClassApi = async (classId,studentId) => {
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

