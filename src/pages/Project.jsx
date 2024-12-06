import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../Actions/Project';
import User from './User';

export default function Project() {
    const dispatch = useDispatch();

    // State for search input and selected filter
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const { projects, loading, error } = useSelector((state) => state.project || {});

    if (loading) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                        <div>Loading...</div>
                    </div>
                </div>
            );    }

    if (error) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-red-600 text-lg font-semibold">
                        Error: {error}
                    </div>
                </div>
            );    }

    if (!projects || projects.length === 0) {
        return<div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-lg font-semibold">
            Nothiggggggg is here 
        </div>
    </div>
    }

    // Filter projects based on search query and selected category
    const filteredProjects = projects.filter((project) => {
        const matchesSearchQuery = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.documentation.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? project.category === selectedCategory : true;
        return matchesSearchQuery && matchesCategory;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0" style={{fontFamily: ' cursive'}}>Here By you can Acess all the things ❤️</h1>
                <div className="flex space-x-4 w-full md:w-auto">
                    <div className="relative flex-grow md:flex-grow-0">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.length === 0 ? (
                    <div>No projects match your search or filter criteria.</div>
                ) : (
                    filteredProjects.map((project) => (
                        <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <img src={project.image.url} alt={project.name} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                                        {project.premium ? 'Premium' : 'Not Premium'}
                                    </span>
                                    <span className="text-sm text-gray-500">{project.date}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                                <p className="text-gray-600 mb-4">
                                    {project.documentation
                                        .split(' ')
                                        .slice(0, 15)
                                        .join(' ')}
                                    {project.documentation.split(' ').length > 15 && '...'} {/* Add ellipsis if there are more than 15 words */}
                                </p>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500"> <User id={project.owner} /></span>
                                    <Link
                                        to={`/details/project/${project._id}`}
                                        className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
                                    >
                                        View Details
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
