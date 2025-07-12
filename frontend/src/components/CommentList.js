import React from 'react';

const CommentList = ({ comments }) => {
    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <div key={comment._id || comment.id} className="comment">
                    <p>{comment.comment}</p>
                    <small>
                        By: {comment.user_id && typeof comment.user_id === 'object' ? (comment.user_id.username || comment.user_id.email) : comment.user_id}
                        {' • '}
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ''}
                    </small>
                </div>
            ))}
        </div>
    );
};

export default CommentList;