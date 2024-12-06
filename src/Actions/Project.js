import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,  
});

export const getProjects = () => async (dispatch) => {
    try {
        dispatch({
            type: "GetProjectsRequest"
        });
        const response = await api.get("api/project/feed");
        if (response && response.data) {
            dispatch({
                type: "GetProjectsSuccess",
                payload: response.data.projects,  
            });
        } else {
            throw new Error("Unexpected API response structure");
        }
    } catch (error) {
        dispatch({
            type: "GetProjectsFailure",
            payload: error.response.data.message
        });
    }
};

export const getSingleProject = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "GetSingleProjectRequest"
        });
        const response = await api.get(`api/project/${id}`);
        console.log(response);  // Check the response structure, is it data.project or data.projects?
        if (response && response.data) {
            dispatch({
                type: "GetSingleProjectSuccess",
                payload: response.data.project,  // Ensure the data is being dispatched correctly
            });
        } else {
            throw new Error("Unexpected API response structure");
        }
    } catch (error) {
        dispatch({
            type: "GetSingleProjectFailure",
            payload: error.response.data.message
        });
    }
}