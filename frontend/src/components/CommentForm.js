import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onSubmit(comment);
            setComment('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CommentForm;