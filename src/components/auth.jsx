import { useState } from 'react';
import { useParams, Link, useNavigate, } from 'react-router-dom';
import { BookMarked, Mail, Lock, Phone, Camera, Fullscreen } from 'lucide-react';// Import the zustand store
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, } from '../Actions/User';
export default function Auth() {
    const { type } = useParams();
    const isSignIn = type === 'signin';
    const user = useSelector((state) => state.user);
    // Local state to track form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [branch, setBranch] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle form submission for sign-in
    const handleSignIn = async (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password,));
        if (user?.isAdmin === true) {
            navigate('/admin/stats');
        }
        else {
            navigate('/dashboard');
        }
    };

    // Handle form submission for sign-up
    const handleSignUp = async (e) => {
        e.preventDefault();
        dispatch(registerUser(name, email, password, phone, branch));
        navigate('/dashboard');
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <Link to="/" className="flex items-center justify-center space-x-2">
                        <BookMarked className="h-8 w-8 text-indigo-600" />
                        <span className="text-2xl font-bold text-gray-900">NexusHub</span>
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        {isSignIn ? 'Sign in to your account' : 'Create your account'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isSignIn ? (
                            <>
                                Or{' '}
                                <Link to="/auth/signup" className="text-indigo-600 hover:text-indigo-500">
                                    create a new account
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <Link to="/auth/signin" className="text-indigo-600 hover:text-indigo-500">
                                    Sign in
                                </Link>
                            </>
                        )}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={isSignIn ? handleSignIn : handleSignUp}>
                    <div className="space-y-4">
                        {!isSignIn && (
                            <>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                                        Branch
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="branch"
                                            name="branch"
                                            type="text"
                                            required
                                            value={branch}
                                            onChange={(e) => setBranch(e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </div>
                    </div>

                    {isSignIn && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    <Link to='/auth/face-login' className='flex ' > <Fullscreen/> Face Login</Link>
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isSignIn ? 'Sign in' : 'Create account'}
                    </button>
                </form>
            </div>
        </div>
    );
}