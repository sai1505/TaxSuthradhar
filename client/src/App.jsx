import React, { useState, useEffect } from 'react';
// Make sure you have a way to make API calls, e.g., using fetch or axios
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Dashboard from './Dashboard';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On initial app load, make an API call to the server to check for a valid session cookie.
  useEffect(() => {
    const checkSession = async () => {
      try {
        // FIX: The fetch request now uses the absolute URL of your backend server.
        // It also includes credentials to ensure the session cookie is sent with the request.
        const response = await fetch('http://localhost:5000/api/auth/check-session', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Important for sending cookies
        });

        if (response.ok) {
          // If the server responds with OK, it means the cookie is valid.
          const data = await response.json();
          setUser(data.user); // Set the user state with data from the server
        } else {
          // If the response is not ok (e.g., 401 Unauthorized), there's no valid session.
          setUser(null);
        }
      } catch (error) {
        console.error("Could not check session:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []); // The empty dependency array ensures this runs only once on mount.

  const navigateTo = (page) => {
    setActivePage(page);
  };

  // This function is called after a successful sign-in API call.
  // The server has already set the session cookie.
  const handleLoginSuccess = (userData) => {
    // The userData object is received from the SignIn component after a successful API call.
    setUser(userData);
    setActivePage('dashboard');
  };

  const handleLogout = async () => {
    try {
      // FIX: The fetch request now uses the absolute URL and includes credentials.
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Important for sending cookies
      });
      setUser(null);
      setActivePage('home');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderPageInMainLayout = () => {
    switch (activePage) {
      case 'signup':
        return <SignUp onNavigate={navigateTo} />;
      case 'signin':
        return <SignIn onNavigate={navigateTo} onLoginSuccess={handleLoginSuccess} />;
      case 'home':
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  // The primary rendering logic is now based on whether 'user' exists.
  return (
    <div className="bg-black text-white min-h-screen antialiased flex flex-col">
      {user ? (
        // If a user exists, always render the Dashboard.
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        // If no user, render the public-facing pages.
        <>
          <Navbar onNavigate={navigateTo} activePage={activePage} user={user} onLogout={handleLogout} />
          <main className="flex-grow">
            {renderPageInMainLayout()}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
