import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';

const Register = () => {
    const [faceData, setFaceData] = useState([]);
    const videoRef = useRef();
    const canvasRef = useRef();

    // Load face-api models
    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
            console.log('Models loaded');
        };
        loadModels();
    }, []);

    // Start video stream
    useEffect(() => {
        const startVideo = async () => {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    videoRef.current.srcObject = stream;
                })
                .catch((err) => console.error('Error accessing webcam: ', err));
        };
        startVideo();
    }, []);

    // Capture face data
    const captureFaceData = async () => {
        if (!videoRef.current) return;

        const detections = await faceapi
            .detectSingleFace(videoRef.current)
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (detections) {
            if (detections.descriptor.length !== 128) {
                alert('Face data length mismatch. Please try again.');
                return;
            }
            setFaceData(detections.descriptor); // Save face descriptor
            console.log('Face data captured:', detections.descriptor);
        } else {
            alert('No face detected. Please try again.');
        }
    };
    console.log('Face data:', faceData);
    const api = axios.create({
        baseURL: 'http://localhost:5000/api/auth',
        withCredentials: true,
    });
    // Handle user registration
    const handleRegister = async () => {
        if (!faceData.length) {
            alert('Please capture your face before registering.');
            return;
        }

        try {
            const response = await api.post('/face-register', {
                faceData,
            });
            alert(response.data.message);
        } catch (err) {
            alert(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Register</h1>
           <div className="mb-6">
                <video ref={videoRef} autoPlay muted className="w-[500px] rounded-lg shadow-lg" />
                <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="space-x-4">
                <button onClick={captureFaceData} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">Capture Face</button>
                <button onClick={handleRegister} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">Register</button>
            </div>
        </div>    );
};

export default Register;
