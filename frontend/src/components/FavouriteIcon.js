// src/components/FavoriteIcon.js
import React from 'react';

const FavoriteIcon = ({ isFavorite, onClick }) => {
    return (
        <span onClick={onClick} style={{ cursor: 'pointer' }}>
            {isFavorite ? '❤️' : '🤍'}
        </span>
    );
};

export default FavoriteIcon;
