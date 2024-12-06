import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,  // Ensure cookies are sent with requests
});

export const faceLogin = (email, faceData) => async (dispatch) => {
    try {
        dispatch({
            type: "FaceLoginRequest",
        });
        if (!faceData.length) {
            alert('Please capture your face before logging in.');
            return;
        }
        const { data } = await api.post(
            "/api/auth/face-login",
            { email, faceData },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({
            type: "FaceLoginSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "FaceLoginFailure",
            payload: error.response.data.message,
        });
    }
}

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest",
        });

        const { data } = await api.post(
            "/api/auth/login",
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({
            type: "LoginSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        });

        const { data } = await api.get("/api/profile/me");

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message,
        });
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LogoutUserRequest",
        });

        await api.get("/api/auth/logout");

        dispatch({
            type: "LogoutUserSuccess",
        });
    } catch (error) {
        dispatch({
            type: "LogoutUserFailure",
            payload: error.response.data.message,
        });
    }
};

export const registerUser = (name, email, password, phone, branch) => async (dispatch) => {
    try {
        dispatch({
            type: "RegisterRequest",
        });

        const { data } = await api.post(
            "/api/auth/register",
            { name, email, password, phone, branch },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({
            type: "RegisterSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message,
        });
    }
};

