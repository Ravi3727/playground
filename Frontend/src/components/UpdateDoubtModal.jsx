import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { useSession, useUser } from '@clerk/clerk-react'
import { MdCloudUpload } from 'react-icons/md';

Modal.setAppElement('#root');

function UpdateDoubtModal({ isOpen, onClose, did, onDoubtUpdated }) {
  const [doubt, setDoubt] = useState('');
  const [file, setFile] = useState(null);
  const inputFile = useRef(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };
  
  const { session } = useSession();
  const { user } = useUser();

  //For updating the doubt
  const handleSubmit = async(e, did) => {  //did => doubt id
    e.preventDefault();
    // console.log('Posted Doubt:', doubt);
    // console.log('Uploaded File:', file);
    const sessionId = session.id;
    // const { id: userId } = user;
    // console.log(userId);

    const doubtData = {
    title: "My React error",
    doubt_description: doubt,
    department: "Web Dev",
  };

    const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/doubts/update/${did}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${sessionId}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(doubtData)
    }) 
    const data = await res.json();
    console.log(data);
    setDoubt('');
    setFile(null);
    onDoubtUpdated();
    onClose();
  };

  const openFileDialog = () => {
    inputFile.current.click();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Post Your Doubt"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '500px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
        },
      }}
    >
      <h2 className="text-lg font-bold mb-4">Post Your Doubt</h2>
      <form onSubmit={(e) => handleSubmit(e, did)}>
        {/* Textarea for doubt */}
        <textarea
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
          placeholder="Type your doubt here..."
          className="w-full p-2 border rounded mb-4"
          rows="5"
        ></textarea>

        {/* File Upload Section */}
        <div className="flex items-center gap-4 mb-4">
          <input
            type="file"
            ref={inputFile}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            accept="image/*"
          />
          <button
            type="button"
            onClick={openFileDialog}
            className="flex items-center px-4 py-2 bg-gray-200 rounded shadow-sm hover:bg-gray-300"
          >
            <MdCloudUpload className="mr-2 h-5 w-5 text-gray-600" />
            {file ? file.name : 'Upload Image'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default UpdateDoubtModal;
