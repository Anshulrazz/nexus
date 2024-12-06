import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faceLogin } from '../Actions/User';


const Login = () => {
    const [email, setEmail] = useState('');
    const [faceData, setFaceData] = useState([]);
    const videoRef = useRef();
    const canvasRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector((state) => state.user);
    const admin = user?.isAdmin;
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
            setFaceData(detections.descriptor);
            console.log('Face data captured:', detections.descriptor);
        } else {
            alert('No face detected. Please try again.');
        }
    };
    console.log('Face data:', faceData);

    // Handle user login
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!faceData.length) {
            alert('Please capture your face before logging in.');
            return;
        }
        dispatch(faceLogin(email, faceData));
        if (admin === true) {
            navigate('/admin/stats');
        }
        else {
            navigate('/dashboard');
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-md px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mb-4">
                <video ref={videoRef} autoPlay muted className="w-full max-w-md rounded-lg shadow-lg" />
                <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex gap-4">
                <button
                    onClick={captureFaceData}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Capture Face
                </button>
                <button
                    onClick={handleLogin}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;

