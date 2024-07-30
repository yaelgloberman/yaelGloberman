import React from 'react';

// React router
import { Route, Routes } from 'react-router-dom';

// Components
import Students from './components/Students/Students/Students';
import Create from './components/Create/Create/Create'
import Classes from './components/Classes/Classes/Classes';

const AppRoutes = () => (
  <Routes>
    <Route path="/classes" element={<Classes />} />
    <Route path="/students" element={<Students />} />
    <Route path="/create" element={<Create />} />
  </Routes>
);

export default AppRoutes;
