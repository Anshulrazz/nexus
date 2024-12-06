import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Download, Share2, BookOpen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProjects } from '../Actions/Project';
import User from './User';
import ReadmeViewer from './ReadmeViewer';
import axios from "axios";


export default function Details() {
    const { id } = useParams(); // Get project ID
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState(''); // State for new comment

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const {  projects, loading, error } = useSelector((state) => state.project || {});
    const {user} = useSelector((state) => state.user || {});
    const userid = user?._id;
    const api = axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true,  // Ensure cookies are sent with requests
    });
    const handleAddComment = async () => {
        try {
            if (!newComment.trim()) {
                return toast.error('Comment cannot be empty!');
            }
            const { data } = await api.post(
                `/api/project/comment/${id}`,
                { comment: newComment },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setNewComment(''); // Clear the input field
            console.log(data);
            toast.success('Comment added!');
            window.location.reload();
        } catch (err) {
            console.error(err);
            toast.error('Failed to add comment');
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await api.post(`/api/project/comment/remove/${id}`, { commentId: commentId });
            toast.success('Comment deleted!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete comment');
        }
    };

    // Handle loading and error states
    if (loading) {
        return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!projects || projects.length === 0) {
        return <div>No projects available</div>;
    }

    const project = projects.find((project) => project._id === id);

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ToastContainer />
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Project Banner */}
                <div className="relative">
                    <img
                        src={project.image.url}
                        alt={project.name}
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
                        <div className="flex items-center space-x-4">
                            <span>
                                <User id={project.owner} />
                            </span>
                            <span>•</span>
                            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                    {/* Tags and Actions */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-2">
                            {project.documentation.match(/#\w+/g) &&
                                project.documentation.match(/#\w+/g).slice(0, 6).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-sm text-indigo-600 bg-indigo-100 rounded-full"
                                    >
                                        {tag || 'Not Available'}
                                    </span>
                                ))}
                        </div>
                        <div className="flex space-x-4">
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast.success('URL copied to clipboard!');
                                }}
                            >
                                <Share2 className="h-5 w-5 mr-2" />                            </button>
                            <button className="btn btn-primary">
                                <Link to={project.link} download={project.file.name}>
                                    <Download className="h-5 w-5 mr-2" />
                                </Link>
                            </button>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <p className="text-gray-600 mb-6">{project.documentation}</p>
                    {/* README Preview */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                            <BookOpen className="h-6 w-6 text-gray-400 mr-2" />
                            <span className="text-gray-600">README Preview</span>
                        </div>
                        <ReadmeViewer filePath={project.file.url} />
                    </div>

                    {/* Comments Section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Comments</h2>
                        <div className="space-y-4">
                            {project?.comments.map((comment) => (
                                <div
                                    key={comment._id}
                                    className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
                                >
                                    <div>
                                        <p className="text-sm text-gray-800">{comment.comment}</p>
                                        <p className="text-xs text-gray-500 flex">By:&nbsp; <User id={comment.user} /> </p><p className='text-xs text-gray-500 flex'> {new Date(comment.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    {userid === comment.user && (
                                        <button
                                            className="text-red-500"
                                            onClick={() => handleDeleteComment(comment._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                rows="3"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            ></textarea>
                            <button
                                className="btn btn-primary mt-2"
                                onClick={handleAddComment}
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
