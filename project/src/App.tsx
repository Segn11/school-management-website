import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import AttendancePage from './pages/AttendancePage';
import GradesPage from './pages/GradesPage';
import TimetablePage from './pages/TimetablePage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ProfilePage from './pages/ProfilePage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="grades" element={<GradesPage />} />
        <Route path="timetable" element={<TimetablePage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        
        {/* Admin and Teacher only routes */}
        {(user?.role === 'admin' || user?.role === 'teacher') && (
          <Route path="students" element={<StudentsPage />} />
        )}
        
        {/* Admin only routes */}
        {user?.role === 'admin' && (
          <>
            <Route path="reports" element={<div>Reports Page</div>} />
            <Route path="settings" element={<div>Settings Page</div>} />
          </>
        )}
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;