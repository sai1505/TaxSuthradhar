import React from 'react';
import { Outlet } from 'react-router-dom';
import UserDashboardNavbar from './UserDashboardNavbar';

function UserDashboardLayout() {
    return (
        // Use h-screen for a fixed viewport height and flexbox for the main layout.
        // This is crucial for the sticky input bar to work correctly.
        <div className="h-screen bg-black text-white flex flex-col">
            <UserDashboardNavbar />

            {/* The main content area now uses flex-1 to take up all available space
              and overflow-hidden to ensure that the UserDashboard's internal scrolling
              doesn't affect the entire page.
            */}
            <main className="flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}

export default UserDashboardLayout;
