import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

// Helper function to safely parse JSON
const parseJSON = (value) => {
    try {
        return JSON.parse(value);
    } catch (error) {
        return null;
    }
};

// Async actions for login and register
export const register = createAsyncThunk('auth/register', async ({ username, email, password }, thunkAPI) => {
    try {
        const response = await authService.register(username, email, password);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        const response = await authService.login(email, password);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

const initialState = {
    user: parseJSON(localStorage.getItem('user')) || null,
    isLoading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            // Register reducers
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Login reducers
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
