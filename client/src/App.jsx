import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';

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