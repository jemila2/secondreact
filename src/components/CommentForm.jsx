


import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';

const CommentForm = ({ onSubmit, value, onChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e); // Pass the event object
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Add a comment..."
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          Post
        </button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
  commentToEdit: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),
  onCancelEdit: PropTypes.func
};

export default CommentForm;