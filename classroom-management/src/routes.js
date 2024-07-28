import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Students from './components/Students';
import Create from './components/Create'
import Classes from './components/Classes/classes/Classes';

const AppRoutes = () => (
  <Routes>
    <Route path="/classes" element={<Classes />} />
    <Route path="/students" element={<Students />} />
    <Route path="/create" element={<Create />} />
  </Routes>
);

export default AppRoutes;
