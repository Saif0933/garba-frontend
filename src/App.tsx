import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { FindPartnerPage } from './pages/public/FindPartnerPage';
import { EventsPage } from './pages/public/EventsPage';
import { EventDetailPage } from './pages/public/EventDetailPage';
import { CitiesPage } from './pages/public/CitiesPage';
import { CityDetailPage } from './pages/public/CityDetailPage';
import { GroupsPage } from './pages/public/GroupsPage';
import { FavoritesPage } from './pages/public/FavoritesPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { FaqPage } from './pages/public/FaqPage';
import { TermsPage } from './pages/public/TermsPage';
import { PrivacyPage } from './pages/public/PrivacyPage';
import { SeoCityPage } from './pages/public/SeoCityPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { VerifyOtpPage } from './pages/auth/VerifyOtpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// User Pages
import { DashboardPage } from './pages/user/DashboardPage';
import { ProfilePage } from './pages/user/ProfilePage';
import { EditProfilePage } from './pages/user/EditProfilePage';
import { MatchesPage } from './pages/user/MatchesPage';
import { MessagesPage } from './pages/user/MessagesPage';
import { RequestsPage } from './pages/user/RequestsPage';
import { NotificationsPage } from './pages/user/NotificationsPage';
import { SettingsPage } from './pages/user/SettingsPage';
import { MyEventsPage } from './pages/user/MyEventsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminMatchesPage } from './pages/admin/AdminMatchesPage';
import { AdminMessagesPage } from './pages/admin/AdminMessagesPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminSubscriptionsPage } from './pages/admin/AdminSubscriptionsPage';
import { AdminCitiesPage } from './pages/admin/AdminCitiesPage';
import { AdminBannersPage } from './pages/admin/AdminBannersPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useApp();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Admin Route Guard
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, isAdmin } = useApp();
  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Public & User Layout Routes */}
          <Route element={<Layout />}>
            {/* First Screen: Login Page */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/find-partner" element={<FindPartnerPage />} />
            <Route path="/partners" element={<FindPartnerPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:eventId" element={<EventDetailPage />} />
            <Route path="/cities" element={<CitiesPage />} />
            <Route path="/cities/:city" element={<CityDetailPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />

            {/* SEO Landing Routes */}
            <Route path="/garba-partner" element={<SeoCityPage />} />
            <Route path="/garba-partner-ranchi" element={<SeoCityPage />} />
            <Route path="/garba-partner-ahmedabad" element={<SeoCityPage />} />
            <Route path="/garba-partner-mumbai" element={<SeoCityPage />} />
            <Route path="/dandiya-partner" element={<SeoCityPage />} />
            <Route path="/navratri-partner" element={<SeoCityPage />} />
            <Route path="/garba-events-ranchi" element={<SeoCityPage />} />
            <Route path="/garba-events-ahmedabad" element={<SeoCityPage />} />
            <Route path="/garba-partner-near-me" element={<SeoCityPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* User Logged-In Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/matches"
              element={
                <ProtectedRoute>
                  <MatchesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/requests"
              element={
                <ProtectedRoute>
                  <RequestsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events/my-events"
              element={
                <ProtectedRoute>
                  <MyEventsPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Admin Dedicated Console Layout & Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="users/:id" element={<AdminUsersPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="events/:id" element={<AdminEventsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="matches" element={<AdminMatchesPage />} />
            <Route path="messages" element={<AdminMessagesPage />} />
            <Route path="payments" element={<AdminPaymentsPage />} />
            <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
            <Route path="cities" element={<AdminCitiesPage />} />
            <Route path="banners" element={<AdminBannersPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
