import React, { useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import { Sidebar } from '../sidebar/Sidebar';
import { Footer } from '../footer/Footer';
import { MobileBottomNav } from './MobileBottomNav';
import { Outlet } from 'react-router-dom';

export const AppLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 pb-16 lg:pb-0">
      {/* Sticky Top Navbar */}
      <Navbar onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Mobile Slide-over Sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative z-10 w-64 bg-background h-full">
              <Sidebar
                collapsed={false}
                onToggleCollapse={() => setMobileSidebarOpen(false)}
                className="w-full h-full border-r-0"
              />
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 flex flex-col min-w-0 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="flex-1 max-w-7xl w-full mx-auto space-y-6">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
};
