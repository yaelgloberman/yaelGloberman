import axios from 'axios';

const baseURL = 'http://localhost:8000'; 

// Axios instance for Students
export const studentsAPI = axios.create({
  baseURL: `${baseURL}/students`, // Base URL + students endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios instance for Classes
export const classesAPI = axios.create({
  baseURL: `${baseURL}/classes`, // Base URL + classes endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

