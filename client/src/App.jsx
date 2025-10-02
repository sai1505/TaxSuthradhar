import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import UserDashboardLayout from './components/User/UserDashboardLayout';
import UserDashboard from './components/User/UserDashboard';
import UserProfile from './components/User/UserProfile';
import UserHistory from './components/User/UserHistory';
import UserDocuments from './components/User/UserDocuments';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Navbar appears on all pages */}
        <Navbar />

        {/* Main content area with routes */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<UserDashboardLayout />}>
              {/* The index route renders the UserDashboard (chat) at /dashboard */}
              <Route index element={<UserDashboard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="history" element={<UserHistory />} />
              <Route path="documents" element={<UserDocuments />} />
            </Route>
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footer appears on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;