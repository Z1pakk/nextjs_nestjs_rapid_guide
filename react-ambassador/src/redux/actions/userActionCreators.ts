import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrentUser = createAsyncThunk(
    'currentUser',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("user");
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const logout = createAsyncThunk(
    'logout',
    async (_, thunkAPI) => {
        try {
            const response = await axios.post("logout");
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)
