import React from 'react';
import { CreatePost } from './CreatePost';
import { Post } from './Post';
import { usePostsStore } from '../store/posts';

export function Feed() {
  const posts = usePostsStore((state) => state.posts);

  return (
    <div className="max-w-2xl mx-auto pt-20 px-4">
      <CreatePost />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}