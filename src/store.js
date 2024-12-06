import { configureStore } from "@reduxjs/toolkit";
import { userReducer,projectReducer } from "./Reducers/User";

export const store = configureStore({
    reducer: {
        user: userReducer,
        project: projectReducer,
    },
});
export default store;