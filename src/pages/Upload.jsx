import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UploadProject() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [link, setLink] = useState('');
    const [documentation, setDocumentation] = useState('');
    const [image, setImage] = useState('');
    const [file, setFile] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();

        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImage(Reader.result);
            }
        };
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();

        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setFile(Reader.result); // Update the image state with base64 URL
            }
        };
    };

    const api = axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true,  // Ensure cookies are sent with requests
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post(
                `/api/project/upload`,
                { name, category, link, documentation, image, file },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log(data);
            toast.success('Project uploaded successfully!');
            window.location.reload();
        } catch (error) {
            toast.error('Failed to upload project!');
            console.error('Error uploading project:', error);
        }
    };

    return (
        <div className="pt-24 pb-16">
            <ToastContainer />
            <div className="max-w-7xl mx-auto px-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Upload New Project</h1>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Project Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg mt-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-gray-700">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg mt-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-gray-700">Description(You can use hastags.)</label>
                        <textarea
                            id="description"
                            name="description"
                            value={documentation}
                            onChange={(e) => setDocumentation(e.target.value)}
                            required
                            rows="4"
                            className="w-full px-4 py-2 border rounded-lg mt-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="link" className="block text-gray-700">Project Link (GitHub)</label>
                        <input
                            type="text"
                            id="link"
                            name="link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg mt-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-gray-700">Project Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                            className="w-full mt-2"
                        />

                        <div className="mt-4">
                            {image && <img src={image} alt="Image Preview" className="w-32 h-32 object-cover rounded-lg" />}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="file" className="block text-gray-700">Upload File (.txt and .md are accepted)</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept=".txt, .md"
                            onChange={handleFileChange}
                            required
                            className="w-full mt-2"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition"
                        >
                            Upload Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
