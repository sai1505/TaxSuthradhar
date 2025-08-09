import React, { useState, useEffect } from 'react';
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

  // On initial app load, check for a valid session cookie.
  useEffect(() => {
    const checkSession = async () => {
      try {
        // MODIFICATION: Using the environment variable for the API URL.
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check-session`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Important for sending cookies
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
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
  }, []);

  const navigateTo = (page) => {
    setActivePage(page);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setActivePage('dashboard');
  };

  const handleLogout = async () => {
    try {
      // MODIFICATION: Using the environment variable for the API URL.
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
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

  return (
    <div className="bg-black text-white min-h-screen antialiased flex flex-col">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
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