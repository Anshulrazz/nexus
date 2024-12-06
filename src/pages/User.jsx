import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = ({ id }) => {
    const [userName, setUserName] = useState(null);

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
                    setUserName(data.user.name); // Set the user's name
                } else {
                    console.error('User not found or data is invalid.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUser();
    }, [id]);

    return <div><Link to={`/user/profile/${id}`}>{userName ? `${userName.toUpperCase()}` : 'Loading...'}</Link> </div>;
};

export default UserProfile;
