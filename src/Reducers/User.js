import { createReducer } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null,
  project:null,
};

// User reducer using builder callback notation
export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LoginRequest', (state) => {
      state.loading = true;
    })
    .addCase('LoginSuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase('LoginFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase('RegisterRequest', (state) => {
      state.loading = true;
    })
    .addCase('RegisterSuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase('RegisterFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase('LoadUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('LoadUserSuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase('LoadUserFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase('LogoutUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('LogoutUserSuccess', (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase('LogoutUserFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    })
    .addCase('FaceLoginRequest', (state) => {
      state.loading = true;
    })
    .addCase('FaceLoginSuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase('FaceLoginFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});

export const projectReducer = createReducer(initialState, (builder) => {
  builder
      .addCase('GetProjectsRequest', (state) => {
          state.loading = true;
      })
      .addCase('GetProjectsSuccess', (state, action) => {
          state.loading = false;
          state.projects = action.payload;
      })
      .addCase('GetProjectsFailure', (state, action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase('GetSingleProjectRequest', (state) => {
          state.loading = true;
      })
      .addCase('GetSingleProjectSuccess', (state, action) => {
          state.loading = false;
          state.project = action.payload;
      })
      .addCase('GetSingleProjectFailure', (state, action) => {
          state.loading = false;
          state.error = action.payload;
      })
});