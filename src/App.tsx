import React from 'react';
import { useAuthStore } from './store/auth';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Feed } from './components/Feed';

export default function App() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Feed />
    </div>
  );
}