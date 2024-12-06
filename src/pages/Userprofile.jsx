import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Mail, Phone, User, Heart, Edit } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import 'primeicons/primeicons.css';
import axios from 'axios';
import { Divider } from 'primereact/divider';

export default function UserProfile() {
    const api = axios.create({
        baseURL: 'http://localhost:5000/api/auth',
        withCredentials: true,
    });
    const { id } = useParams();
    const { user } = useSelector((state) => state.user);
    const isOwnProfile = user?._id === id;
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
    const profileData = {
        id,
        name: user?.name.toUpperCase() || 'John Doe',
        email: user?.email || 'sarah.chen@example.com',
        phone: user?.phone || '+1 234 567 8900',
        branch: user?.branch || 'Computer Science',
        bio: user?.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, eget aliquam nunc nisl sit amet nunc. Nulla euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, eget aliquam nunc nisl sit amet nunc.',
        avatar: user?.avatar?.url || 'https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg',
        stats: {
            projects: user?.project.length,
            documents: user?.credit,
            rank: user?.project.length / 2,
        }
    }
    const addbio = async () => {
        try {
            const response = await api.post('/add-bio', { bio: value });
            console.log(response.data.message);
            setVisible(false);
            window.location.reload();
        } catch (error) {
            console.error('Error adding bio:', error);
        }
    };

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
                            src={profileData.avatar}
                            alt={profileData.name}
                            className="w-24 h-24 rounded-full border-4 border-white"
                        />
                        {isOwnProfile && (
                            <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2">
                                <Edit className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>


                <div className="pt-16 pb-8 px-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                            <hr />   
                        </div>
                            <hr />   
                        {isOwnProfile && (
                            <div className="card flex justify-content-center">
                                <Button className="rounded outline outline-1 bg-blue-500 text-white px-1 py-1" onClick={() => setVisible(true)} > Add Bio </Button>
                                <Dialog className='bg-white rounded-lg shadow-md' visible={visible} style={{ width: '40vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                                    <div className="p-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Add Bio...........</label>
                                        <InputTextarea
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            rows={5}
                                            cols={30}
                                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <Button
                                            label="Submit"
                                            className="rounded outline outline-1 bg-blue-500 text-white px-1 py-1"
                                            onClick={addbio}
                                        />
                                    </div>
                                </Dialog>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Mail className="h-5 w-5" />
                            <span>{profileData.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Phone className="h-5 w-5" />
                            <span>{profileData.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <User className="h-5 w-5" />
                            <span>{profileData.branch}</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
                        <p className="text-gray-600">{profileData.bio}</p>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">{profileData.stats.projects}</div>
                            <div className="text-sm text-gray-600">Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">{profileData.stats.documents}</div>
                            <div className="text-sm text-gray-600">Credits</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">{profileData.stats.rank}</div>
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