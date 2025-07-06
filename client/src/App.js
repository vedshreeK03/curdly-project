import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CurdList from './pages/CurdList';
import AddEditCurd from './pages/AddEditCurd';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterUser from './pages/RegisterUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/curds" element={<ProtectedRoute><CurdList /></ProtectedRoute>} />
        <Route path="/curds/new" element={<ProtectedRoute><AddEditCurd /></ProtectedRoute>} />
        <Route path="/curds/edit/:id" element={<ProtectedRoute><AddEditCurd edit /></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute><RegisterUser /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
