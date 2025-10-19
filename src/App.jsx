import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Layout, { EventContext } from './components/Layout';
import MainHub from './components/hub/MainHub';
import EventManagementDashboard from './components/events/dashboard/EventManagementDashboard';
import InscriptionsModule from './components/inscriptions/InscriptionsModule';
import ConfirmationCenter from './components/confirmations/ConfirmationCenter';
import AdministrativeModule from './components/administrative/AdministrativeModule';
import ArtsCertificatesModule from './components/arts/ArtsCertificatesModule';
import ShippingModule from './components/shipping/ShippingModule';
import FinancialModule from './components/financial/FinancialModule';
import AuditModule from './components/audit/AuditModule';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Verificar se usuário já está logado (localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/hub" replace />} />
          <Route path="/hub" element={<MainHub />} />
          <Route path="/dashboard" element={<div className="p-6"><h1 className="text-2xl font-bold text-white">Dashboard</h1></div>} />
          <Route path="/eventos" element={<EventManagementDashboard />} />
          <Route path="/inscricoes" element={<InscriptionsModule />} />
          <Route path="/confirmacoes" element={<ConfirmationCenter />} />
          <Route path="/artes" element={<ArtsCertificatesModule />} />
          <Route path="/administrativo" element={<AdministrativeModule />} />
          <Route path="/envios" element={<ShippingModule />} />
          <Route path="/portaria" element={<div className="p-6"><h1 className="text-2xl font-bold text-white">Portaria</h1></div>} />
          <Route path="/calendario" element={<div className="p-6"><h1 className="text-2xl font-bold text-white">Calendário</h1></div>} />
          <Route path="/financeiro" element={<FinancialModule />} />
          <Route path="/auditoria" element={<AuditModule />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
