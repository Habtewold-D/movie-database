import React from 'react';

const CommentList = ({ comments }) => {
    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <div key={comment.id} className="comment">
                    <p>{comment.comment}</p>
                    <small>By: {comment.user_id} • {new Date(comment.createdAt).toLocaleString()}</small>
                </div>
            ))}
        </div>
    );
};

export default CommentList;