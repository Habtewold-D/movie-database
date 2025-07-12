import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetailsByTmdbId } from '../services/movieService';
import { getComments, addComment } from '../services/commentService';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import FavoriteIcon from '../components/FavoriteIcon';
import WatchlistIcon from '../components/WatchlistIcon';
import AuthContext from '../context/AuthContext';

const MovieDetails = () => {
    const { id } = useParams(); // id is the TMDB ID
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user, token } = useContext(AuthContext);

    useEffect(() => {
        const loadMovieDetails = async () => {
            setIsLoading(true);
            try {
                let data;
                try {
                    data = await fetchMovieDetailsByTmdbId(id);
                } catch (err) {
                    if (err.response && err.response.status === 404) {
                        data = null;
                    } else {
                        throw err;
                    }
                }
                setMovie(data);
                if (data && data._id) {
                    const commentsData = await getComments(data._id);
                    setComments(commentsData);
                } else {
                    setComments([]);
                }
            } catch (error) {
                setMovie(null);
                setComments([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadMovieDetails();
    }, [id]);

    const handleAddComment = async (comment) => {
        if (!movie || !movie._id) return;
        try {
            const newComment = await addComment(user._id, movie.tmdb_id, comment, token);
            setComments([...comments, newComment]);
        } catch (error) {
            // Optionally show an error message
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
            <p>Release Date: {movie.release_date ? movie.release_date.slice(0, 10) : ''}</p>
            <p>Rating: {movie.vote_average || movie.rating}</p>
            <div style={{ display: 'flex', gap: '0.75em', alignItems: 'center', marginTop: '0.5em' }}>
                <FavoriteIcon movieId={movie.tmdb_id || movie.id} />
                <WatchlistIcon movieId={movie.tmdb_id || movie.id} />
            </div>
            <h2>Comments</h2>
            <CommentForm onSubmit={handleAddComment} />
            <CommentList comments={comments} />
        </div>
    );
};

export default MovieDetails;