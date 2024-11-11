import React from 'react';
import { Users, Store, UserCircle, Calendar, Clock, Bookmark, Flag, Heart, Settings } from 'lucide-react';
import { useAuthStore } from '../store/auth';

export function Sidebar() {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;

  const menuItems = [
    { icon: UserCircle, text: 'Friends', link: '#' },
    { icon: Users, text: 'Groups', link: '#' },
    { icon: Store, text: 'Marketplace', link: '#' },
    { icon: Calendar, text: 'Events', link: '#' },
    { icon: Clock, text: 'Memories', link: '#' },
    { icon: Bookmark, text: 'Saved', link: '#' },
    { icon: Flag, text: 'Pages', link: '#' },
    { icon: Heart, text: 'Fundraisers', link: '#' },
    { icon: Settings, text: 'Settings', link: '#' },
  ];

  return (
    <div className="fixed left-0 top-14 w-64 h-[calc(100vh-3.5rem)] overflow-y-auto hidden lg:block p-4">
      <div className="space-y-2">
        <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
          <span className="font-medium">{user.name}</span>
        </a>
        
        {menuItems.map((item) => (
          <a
            key={item.text}
            href={item.link}
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
          >
            <item.icon className="w-6 h-6 text-blue-600" />
            <span>{item.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}