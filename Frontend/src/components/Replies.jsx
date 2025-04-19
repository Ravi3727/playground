import React, { useState } from 'react';

const Replies = ({ replies, onAddReply }) => {
  const [newReply, setNewReply] = useState('');

  const handleReplySubmit = () => {
    if (newReply.trim()) {
      onAddReply(newReply);
      setNewReply('');
    }
  };

  return (
    <div className="border rounded-xl p-5 bg-gray-50 shadow-md transition-all">
      <h3 className="font-bold text-lg mb-4">Replies</h3>
      <div className="space-y-4">
        {replies.map((reply, index) => (
          <div key={index} className="border-b pb-3">
            <p className="text-sm text-gray-800">{reply}</p>
            <span className="text-xs text-gray-500">Posted just now</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Write your reply..."
          className="w-full border p-2 rounded-md"
        />
        <button
          onClick={handleReplySubmit}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Add Reply
        </button>
      </div>
    </div>
  );
};

export default Replies;
