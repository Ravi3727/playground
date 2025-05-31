import React, { useEffect, useState } from 'react';
import { useSession, useUser } from '@clerk/clerk-react';

function Replies({ doubtId }) {
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editMessage, setEditMessage] = useState('');
  const { session } = useSession();
  const { user } = useUser();
  const sessionId = session.id;
  
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/doubts/${doubtId}/replies`, {
          headers: {
            "Authorization": `Bearer ${sessionId}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setReplies(data.data || []);
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };

    fetchReplies();
  }, [doubtId]);

  const handlePostReply = async () => {
    if (!newReply.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/v1/doubts/${doubtId}/reply`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${sessionId}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: user.username,
          message: newReply,
        }),
      });

      const data = await res.json();
      setReplies(prev => [...prev, data.reply]);
      setNewReply('');
    } catch (error) {
      console.error('Error posting reply:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reply) => {
    setEditingReplyId(reply._id);
    setEditMessage(reply.message);
  };


  const updateReply = async (replyId, newMessage) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/doubts/${doubtId}/replies/${replyId}/update`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${sessionId}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      const data = await res.json();
      if (data.success) {
        setReplies((prev) =>
          prev.map((r) => (r._id === replyId ? { ...r, message: newMessage } : r))
        );
      }
    } catch (err) {
      console.error('Error updating reply:', err);
    }
  };

  const deleteReply = async (replyId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this reply?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/doubts/${doubtId}/replies/${replyId}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setReplies((prev) => prev.filter((r) => r._id !== replyId));
      }
    } catch (err) {
      console.error('Error deleting reply:', err);
    }
  };

  const handleReplyLike = async (doubtId, replyId) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/doubts/${doubtId}/replies/${replyId}/like`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      }
    );
    const data = await res.json();

    if (data.success) {
      const updatedReply = data.data;
      setReplies((prev) =>
  prev.map((reply) =>
    reply._id === replyId ? { ...reply, likes: (reply.likes || 0) + 1 } : reply
  )
);

    }
  } catch (err) {
    console.error("Error liking reply:", err);
  }
};


  return (
    <div className="mt-4">
      {/* Replies List */}
      <div className="space-y-3">
        {replies.length > 0 ? (
          replies.map(reply => (
            <div
              key={reply._id}
              className="flex items-start gap-3 group relative hover:bg-gray-50 p-2 rounded-md transition"
            >
              <div className="w-9 h-9 bg-gray-300 rounded-full flex-shrink-0" />

              <div className="flex flex-col w-full">
                {editingReplyId === reply._id ? (
                  <>
                    <input
                      type="text"
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      className="px-2 py-1 border text-sm rounded"
                    />
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => updateReply(reply._id, editMessage)}
                        className="text-xs text-green-600 hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingReplyId(null)}
                        className="text-xs text-gray-400 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-800">
                      <strong>{reply.author}</strong> {reply.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
  <button
    onClick={() => handleReplyLike(doubtId, reply._id)}
    className="text-xs text-gray-500 hover:text-blue-500"
  >
    👍 Like
  </button>
  <span className="text-xs text-gray-400">{reply.likes || 0} likes</span>
</div>

                    <span className="text-xs text-gray-400 mt-1">Just now</span>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              
              {user?.username === reply.author && editingReplyId !== reply._id && (
                <div className="absolute right-2 top-2 hidden group-hover:flex gap-2">
                  <button
                    onClick={() => handleEdit(reply)}
                    className="text-xs text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteReply(reply._id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No replies yet.</p>
        )}
      </div>

      {/* New Reply Input */}
      <div className="flex items-center border-t pt-3 mt-4">
        <input
          type="text"
          placeholder="Add a reply..."
          className="flex-grow px-4 py-2 text-sm outline-none"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        />
        <button
          onClick={handlePostReply}
          disabled={loading || !newReply.trim()}
          className={`text-sm font-medium ${newReply.trim() ? 'text-blue-500' : 'text-gray-400'
            } hover:text-blue-600`}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default Replies;
