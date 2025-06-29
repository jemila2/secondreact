
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

   const fetchPostDetail = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(`http://localhost:5003/api/blog/${id}`);
        
        if (response.data.success) {
            setPost(response.data.data);
        } else {
            setError(response.data.message || "Post not found.");
        }
    } catch (err) {
        if (err.response) {
            // Handle 4xx/5xx errors
            setError(err.response.data.message || "Server error");
        } else {
            setError("Network error. Please try again.");
        }
    } finally {
        setIsLoading(false);
    }
};

    useEffect(() => {
        fetchPostDetail();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>; // Replace with a spinner if needed
    }

    if (error) {
        return (
            <div className="p-4">
                <p className="text-red-500">{error}</p>
                <button 
                    onClick={() => navigate(-1)} 
                    className="mt-4 px-4 py-2 bg-gray-200 rounded"
                >
                    ← Go Back
                </button>
            </div>
        );
    }

    // ✅ Check if `post` exists before rendering
    if (!post) {
        return <div>No post data available.</div>;
    }

    return (
        <div className="post-detail-container p-4">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            {post.image && (
                <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full max-h-96 object-contain mb-4" 
                />
            )}
            <p className="text-lg whitespace-pre-line">{post.content}</p>
            <button 
                onClick={() => navigate(-1)} 
                className="mt-4 px-4 py-2 bg-gray-200 rounded"
            >
                ← Go Back
            </button>
        </div>
    );
};

export default PostDetail;




