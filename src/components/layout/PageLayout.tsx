import React from 'react';
import Header from '../Header';
import Navbar from '../Navbar';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="content-wrapper">
        <Header />
        <Navbar />
        <main className="page-container">
          {children}
        </main>
      </div>
    </div>
  );
};