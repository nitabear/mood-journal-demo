import React from 'react';
import { Navbar } from './Navbar';

export const Layout = ({ children }) => {
  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};
