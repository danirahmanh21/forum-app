/*eslint linebreak-style: ["error", "windows"]*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ForumInput({ addForum }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  function handleTitleChange({ target }) {
    if (target.value.length <= 500) {
      setTitle(target.value);
    }
  }

  function handleBodyChange({ target }) {
    if (target.value.length <= 8000) {
      setBody(target.value);
    }
  }

  function handleCategoryChange({ target }) {
    setCategory(target.value);
  }

  function handleSubmit() {
    if (title.trim() && body.trim() && category.trim()) {
      addForum({ title, body, category });
      setTitle('');
      setBody('');
      setCategory('');
    }
  }

  return (
    <div className="talk-input">
      <input
        className="forum-input__title"
        type="text"
        placeholder="Enter thread title..."
        value={title}
        onChange={handleTitleChange}
      />

      <input
        className="forum-input__category"
        type="text"
        placeholder="Category"
        value={category}
        onChange={handleCategoryChange}
      />

      <textarea
        className="forum-input__body"
        placeholder="What are you asking?"
        value={body}
        onChange={handleBodyChange}
      />

      <p className="talk-input__char-left">
        <strong>{body.length}</strong> /8000
      </p>

      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

ForumInput.propTypes = {
  addForum: PropTypes.func.isRequired,
};

export default ForumInput;
