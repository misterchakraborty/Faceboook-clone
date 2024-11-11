import React from 'react';
import { Search, Home, Users, Store, PlayCircle, Bell, MessageCircle, Menu } from 'lucide-react';
import { useAuthStore } from '../store/auth';

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  if (!user) return null;

  return (
    <nav className="fixed top-0 inset-x-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center flex-1">
            <h1 className="text-2xl font-bold text-blue-600">facebook</h1>
            <div className="hidden md:flex items-center ml-4 bg-gray-100 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search Facebook"
                className="ml-2 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1">
            <button className="px-10 py-2 hover:bg-gray-100 rounded-lg">
              <Home className="w-6 h-6" />
            </button>
            <button className="px-10 py-2 hover:bg-gray-100 rounded-lg">
              <Users className="w-6 h-6" />
            </button>
            <button className="px-10 py-2 hover:bg-gray-100 rounded-lg">
              <Store className="w-6 h-6" />
            </button>
            <button className="px-10 py-2 hover:bg-gray-100 rounded-lg">
              <PlayCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-end flex-1">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Menu className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-6 h-6" />
            </button>
            <button
              onClick={() => logout()}
              className="flex items-center space-x-2 ml-2 hover:bg-gray-100 rounded-full p-1"
            >
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}