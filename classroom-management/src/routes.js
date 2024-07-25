import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Classes from './components/Classes/Classes';
import Students from './components/Students';
import Create from './components/Create'
// import Classes from './components/classes/classes/Classes';
import Classes from './components/Classes/Classes/Classes';

const AppRoutes = () => (
  <Routes>
    <Route path="/classes" element={<Classes />} />
    <Route path="/students" element={<Students />} />
    <Route path="/create" element={<Create />} />
  </Routes>
);

export default AppRoutes;
