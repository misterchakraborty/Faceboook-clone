import React from 'react';
import { Plus } from 'lucide-react';
import { useAuthStore } from '../store/auth';

const demoStories = [
  {
    id: '1',
    user: { name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800'
  },
  {
    id: '2',
    user: { name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
    image: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800'
  },
  {
    id: '3',
    user: { name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
    image: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=800'
  }
];

export function Stories() {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
      <div className="relative group cursor-pointer">
        <div className="relative h-48 rounded-xl overflow-hidden">
          <img
            src={user.avatar}
            alt="Create Story"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all" />
          <div className="absolute bottom-0 w-full p-4 text-white">
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <p className="text-center text-sm mt-6">Create Story</p>
          </div>
        </div>
      </div>

      {demoStories.map((story) => (
        <div key={story.id} className="relative group cursor-pointer">
          <div className="relative h-48 rounded-xl overflow-hidden">
            <img
              src={story.image}
              alt={story.user.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all" />
            <div className="absolute top-4 left-4">
              <div className="w-10 h-10 rounded-full ring-4 ring-blue-600 overflow-hidden">
                <img
                  src={story.user.avatar}
                  alt={story.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm font-medium">{story.user.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}