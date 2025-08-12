import React from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { Outlet } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}