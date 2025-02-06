import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, getComments, addComment } from '../services/api';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import FavoriteIcon from '../components/FavoriteIcon';
import WatchlistIcon from '../components/WatchlistIcon';
import AuthContext from '../context/AuthContext';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const loadMovieDetails = async () => {
            setIsLoading(true);
            try {
                const data = await fetchMovieDetails(id);
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const loadComments = async () => {
            try {
                const data = await getComments(id);
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        loadMovieDetails();
        loadComments();
    }, [id]);

    const handleAddComment = async (comment) => {
        try {
            const newComment = await addComment(user.id, id, comment); // Add comment
            setComments([...comments, newComment]); // Update comments list
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    if (isLoading) return <div className="loading-spinner">Loading...</div>;
    if (!movie) return <div>No movie found.</div>;

    return (
        <div className="movie-details">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
            />
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            <FavoriteIcon movieId={movie.id} />
            <WatchlistIcon movieId={movie.id} />
            <CommentForm onSubmit={handleAddComment} />
            <CommentList comments={comments} />
        </div>
    );
};

export default MovieDetails;