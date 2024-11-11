import { create } from 'zustand';
import { Post, Comment } from '../types';

interface PostsState {
  posts: Post[];
  addPost: (userId: string, content: string, image?: string) => void;
  updatePost: (postId: string, content: string, image?: string) => void;
  deletePost: (postId: string) => void;
  likePost: (postId: string, userId: string) => void;
  addComment: (postId: string, userId: string, content: string) => void;
  updateComment: (postId: string, commentId: string, content: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [
    {
      id: '1',
      userId: '1',
      content: 'Just launched my new project! 🚀',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800',
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    },
  ],
  addPost: (userId, content, image) =>
    set((state) => ({
      posts: [
        {
          id: Date.now().toString(),
          userId,
          content,
          image,
          likes: [],
          comments: [],
          createdAt: new Date().toISOString(),
        },
        ...state.posts,
      ],
    })),
  updatePost: (postId, content, image) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              content,
              image,
              editedAt: new Date().toISOString(),
            }
          : post
      ),
    })),
  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),
  likePost: (postId, userId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes.includes(userId)
                ? post.likes.filter((id) => id !== userId)
                : [...post.likes, userId],
            }
          : post
      ),
    })),
  addComment: (postId, userId, content) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now().toString(),
                  userId,
                  content,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : post
      ),
    })),
  updateComment: (postId, commentId, content) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      content,
                      editedAt: new Date().toISOString(),
                    }
                  : comment
              ),
            }
          : post
      ),
    })),
  deleteComment: (postId, commentId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter((comment) => comment.id !== commentId),
            }
          : post
      ),
    })),
}));