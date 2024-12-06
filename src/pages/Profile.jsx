import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Mail, Phone, User, Heart } from 'lucide-react';
import axios from 'axios';
import FollowButton from '../components/FollowButton';
export default function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/profile/user/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (data.success && data.user && data.user.name) {
                    setUser(data.user); // Set the user's name
                } else {
                    console.error('User not found or data is invalid.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUser();
    }, [id]);


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-blue-50 rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                    <img
                        src="https://i.pinimg.com/736x/93/46/b9/9346b9be943e1bae0acd662bba9c5db9.jpg" // Replace with the URL of your image
                        alt="Background Image"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute -bottom-12 left-8">
                        <img
                            src={'https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg'}
                            className="w-24 h-24 rounded-full border-4 border-white"
                        />
                    </div>
                </div>


                <div className="pt-16 pb-8 px-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className='flex justify-between'> <h1 className="text-2xl font-bold text-gray-900">{user?.name} </h1> <FollowButton userId={user?._id} /></span>                       
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Mail className="h-5 w-5" />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            {/* <Phone className="h-5 w-5" />
                            <span>{user?.phone}</span> */}
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <User className="h-5 w-5" />
                            <span>{user?.branch}</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
                        <p className="text-gray-600">{user?.bio}</p>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">{user?.project.length}</div>
                            <div className="text-sm text-gray-600">Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">{user?.credit}</div>
                            <div className="text-sm text-gray-600">Credits</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">{user?.project.length / 2}</div>
                            <div className="text-sm text-gray-600">Score</div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
                        </div>
                    </div>
                    <div className="p-6">
                        {user?.project?.map((project) => (
                            <Link
                                key={project._id}
                                to={`/details/project/${project._id}`}
                                className="block hover:bg-gray-50 -mx-6 px-6 py-3"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{project.name}</p>
                                        <p className="text-sm text-gray-600">{project.documentation
                                            .split(' ')
                                            .slice(0, 15)
                                            .join(' ')}
                                            {(project.documentation.split(' ').length > 15 && '...') || ""}</p>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Heart className="h-4 w-4 mr-1" />
                                        {project.likes || 0}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}