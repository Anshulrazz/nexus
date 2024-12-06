import React, { useState, useEffect } from "react";
import axios from "axios";

const FollowButton = ({ userId }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const api = axios.create({
        baseURL: "http://localhost:5000/api/auth",
        withCredentials: true,
    });
    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const response = await api.get(`/follow-status/${userId}`);
                setIsFollowing(response.data.message);
            } catch (error) {
                console.error("Error fetching follow status:", error);
            }
        };
        fetchFollowStatus();    
    }, [userId]);

    const handleFollow = async () => {
        setLoading(true);
        try {
            const response = await api.post(`/follow/${userId}`);
            setIsFollowing(response.data.message === "User followed");
            console.log(response.data.message);
        } catch (error) {
            console.error("Error following/unfollowing user:", error);
        }
        setLoading(false);
        window.location.reload();
    };
    return (
        <span
            onClick={handleFollow}
            disabled={loading}
            className={`px-2 py-2 text-xs font-semibold rounded-full cursor-pointer ${isFollowing === true ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                }`}
        >
            {loading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
        </span>    );
};

export default FollowButton;
