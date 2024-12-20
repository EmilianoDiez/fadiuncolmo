import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Users, Calendar, ScanLine } from 'lucide-react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Reservations from './pages/Reservations';
import Scanner from './pages/Scanner';
import Admin from './pages/Admin';
import Monitor from './pages/Monitor';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';
import MonitorProtectedRoute from './components/auth/MonitorProtectedRoute';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  const navItems = [
    { label: 'Inicio', path: '/', icon: Users },
    { 
      label: 'Registrarse', 
      path: '/register', 
      icon: Users,
      hideWhenAuth: true 
    },
    { 
      label: 'Reservas', 
      path: '/reservations', 
      icon: Calendar,
      requiresAuth: true 
    },
    { label: 'Escáner', path: '/scanner', icon: ScanLine },
  ];

  return (
    <Router>
      <div className="min-h-screen">
        <div className="content-wrapper">
          <Header />
          <Navbar items={navItems} user={user} />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/reservations" 
                element={
                  <ProtectedRoute>
                    <Reservations />
                  </ProtectedRoute>
                } 
              />
              <Route path="/scanner" element={<Scanner />} />
              <Route 
                path="/admin" 
                element={
                  <AdminProtectedRoute>
                    <Admin />
                  </AdminProtectedRoute>
                } 
              />
              <Route 
                path="/monitor" 
                element={
                  <MonitorProtectedRoute>
                    <Monitor />
                  </MonitorProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;