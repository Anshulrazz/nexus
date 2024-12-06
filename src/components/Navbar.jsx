import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookMarked, Fullscreen, LayoutDashboard, LogOut, Menu, User, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Actions/User';  // Make sure you have the logout action

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);

    const { isAuthenticated, user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle user logout
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/auth/signin');
    };

    useEffect(() => {
        if (isAuthenticated) {
            setIsProfileOpen(false);
        }
    }, [isAuthenticated]);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <BookMarked className="h-8 w-8 text-indigo-600" />
                            <span className="font-bold text-xl text-gray-900">NexusHub</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-8">
                        <Link to="/projects" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                            Projects
                        </Link>
                        <Link to="/upload" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                            Upload
                        </Link>
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
                                >
                                    <img
                                        src={'https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg'}
                                        alt={'User'}
                                        className="h-8 w-8 rounded-full"
                                    />
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 z-[1000] bg-white rounded-md shadow-lg py-1">
                                        <Link
                                            to="/dashboard"
                                            className=" flex block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <LayoutDashboard className="mr-2" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            to={`/user/${user._id}`}
                                            className="flex block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <User className="mr-2" />
                                            Profile
                                        </Link>
                                        <Link
                                            to='/auth/save-face'
                                            className="flex block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <Fullscreen className="mr-2" />
                                            Face Register
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                                        >
                                            <LogOut className="mr-2" />
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/auth/signin"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link
                            to="/projects"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Projects
                        </Link>
                        <Link
                            to="/documents"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Documents
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to={`/user/${user?.id}`}
                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/auth/signin"
                                className="block px-3 py-2 text-base font-medium text-indigo-600 hover:text-indigo-800"
                                onClick={() => setIsOpen(false)}
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
