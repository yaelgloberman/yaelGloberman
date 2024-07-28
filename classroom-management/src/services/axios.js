import axios from 'axios';

const baseURL = 'http://localhost:8000'; 

export const studentsAPI = axios.create({
  baseURL: `${baseURL}/students`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const classesAPI = axios.create({
  baseURL: `${baseURL}/classes`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

