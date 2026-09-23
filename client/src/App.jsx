import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { QuestionBankPage } from './pages/QuestionBankPage';
import { InterviewPage } from './pages/InterviewPage';
import { CodingPracticePage } from './pages/CodingPracticePage';
import { ResumeReviewPage } from './pages/ResumeReviewPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0A0F1D] text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white transition-colors">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public & Core Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/questions" element={<QuestionBankPage />} />
                <Route path="/interview" element={<InterviewPage />} />
                <Route path="/practice" element={<CodingPracticePage />} />
                <Route path="/resume" element={<ResumeReviewPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Protected User Account */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
