import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuthStore } from '../store/auth';
import { usePostsStore } from '../store/posts';
import type { Post as PostType, Comment } from '../types';

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  
  const user = useAuthStore((state) => state.user);
  const { likePost, addComment, updatePost, deletePost, updateComment, deleteComment } = usePostsStore();

  if (!user) return null;

  const handleLike = () => {
    likePost(post.id, user.id);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(post.id, user.id, comment);
      setComment('');
    }
  };

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedContent.trim()) {
      updatePost(post.id, editedContent, post.image);
      setIsEditing(false);
    }
  };

  const handleUpdateComment = (commentId: string) => {
    if (editedCommentContent.trim()) {
      updateComment(post.id, commentId, editedCommentContent);
      setEditingCommentId(null);
    }
  };

  const startEditingComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentContent(comment.content);
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={post.userId === user.id ? user.avatar : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'}
              alt="User avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold">{post.userId === user.id ? user.name : 'Another User'}</h3>
              <p className="text-gray-500 text-sm">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                {post.editedAt && ' (edited)'}
              </p>
            </div>
          </div>
          
          {post.userId === user.id && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setShowMenu(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>Edit Post</span>
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-gray-100 text-left text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Post</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdatePost} className="mb-4">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <p className="mb-4">{post.content}</p>
        )}

        {post.image && (
          <img src={post.image} alt="Post content" className="rounded-lg w-full mb-4" />
        )}

        <div className="flex items-center justify-between border-t border-b py-2">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 ${
              post.likes.includes(user.id) ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Heart className={`w-6 h-6 ${post.likes.includes(user.id) ? 'fill-current' : ''}`} />
            <span>{post.likes.length} Likes</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <MessageCircle className="w-6 h-6" />
            <span>{post.comments.length} Comments</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <Share className="w-6 h-6" />
            <span>Share</span>
          </button>
        </div>

        {showComments && (
          <div className="mt-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3 mb-3">
                <img
                  src={comment.userId === user.id ? user.avatar : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'}
                  alt="Commenter avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  {editingCommentId === comment.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editedCommentContent}
                        onChange={(e) => setEditedCommentContent(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateComment(comment.id)}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">
                          {comment.userId === user.id ? user.name : 'Another User'}
                        </p>
                        {comment.userId === user.id && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEditingComment(comment)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteComment(post.id, comment.id)}
                              className="text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p>{comment.content}</p>
                      {comment.editedAt && (
                        <p className="text-xs text-gray-500 mt-1">(edited)</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <form onSubmit={handleComment} className="flex items-center space-x-2 mt-4">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}