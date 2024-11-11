import React from 'react';
import { Gift, VideoIcon } from 'lucide-react';

const onlineFriends = [
  { id: '1', name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
  { id: '2', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
  { id: '3', name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' }
];

const birthdays = [
  { id: '1', name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }
];

export function RightSidebar() {
  return (
    <div className="fixed right-0 top-14 w-64 h-[calc(100vh-3.5rem)] overflow-y-auto hidden lg:block p-4">
      {birthdays.length > 0 && (
        <div className="mb-6">
          <h3 className="text-gray-500 font-medium mb-2">Birthdays</h3>
          {birthdays.map((friend) => (
            <div key={friend.id} className="flex items-center space-x-3 p-2">
              <Gift className="w-8 h-8 text-blue-600" />
              <p className="text-sm">
                <span className="font-medium">{friend.name}</span>'s birthday is today
              </p>
            </div>
          ))}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-500 font-medium">Contacts</h3>
          <VideoIcon className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
        </div>
        
        {onlineFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <div className="relative">
              <img src={friend.avatar} alt={friend.name} className="w-8 h-8 rounded-full" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
            </div>
            <span className="font-medium">{friend.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}