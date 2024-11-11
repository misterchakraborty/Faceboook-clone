import React, { useState } from 'react';
import { Image, Smile, Video } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { usePostsStore } from '../store/posts';

export function CreatePost() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const user = useAuthStore((state) => state.user);
  const addPost = usePostsStore((state) => state.addPost);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      addPost(user.id, content, image);
      setContent('');
      setImage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-2 mb-4">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {image && (
          <div className="mb-4 relative">
            <img src={image} alt="Post preview" className="rounded-lg w-full object-cover" />
            <button
              type="button"
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
              onClick={() => setImage('')}
            >
              ×
            </button>
          </div>
        )}

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex space-x-4">
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-lg"
              onClick={() => setImage('https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800')}
            >
              <Image className="w-6 h-6 text-green-500" />
              <span>Photo</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-lg"
            >
              <Video className="w-6 h-6 text-red-500" />
              <span>Video</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-lg"
            >
              <Smile className="w-6 h-6 text-yellow-500" />
              <span>Feeling</span>
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            disabled={!content.trim()}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}