import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';

function App() {
  const [activePage, setActivePage] = useState('home');

  const navigateTo = (page) => {
    if (page === 'app') {
      setActivePage('home');
    } else {
      setActivePage(page);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'signup':
        // This line is the fix. We are passing the function as a prop.
        return <SignUp onNavigate={navigateTo} />;
      case 'signin':
        // You should do the same for the SignIn component
        return <SignIn onNavigate={navigateTo} />;
      case 'home':
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen antialiased flex flex-col">
      <Navbar onNavigate={navigateTo} activePage={activePage} />

      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

export default App;
