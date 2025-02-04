// src/components/CommentForm.js
import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(comment);
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CommentForm;
