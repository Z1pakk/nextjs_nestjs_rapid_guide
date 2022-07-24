import { IUser } from "../../models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrentUser, logout } from "../actions/userActionCreators";

interface UserState {
    user: IUser | null,
    isLoading: boolean,
    error: string,
}

const initialState: UserState = {
    user: null,
    isLoading: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        },
    },
    extraReducers: {
        [fetchCurrentUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.error = '';
            state.isLoading = false;
        },
        [fetchCurrentUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchCurrentUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.user = null;
            state.isLoading = false;
        },

        [logout.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = null;
            state.error = '';
            state.isLoading = false;
        },
        [logout.pending.type]: (state) => {
            state.isLoading = true;
        },
        [logout.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.user = null;
            state.isLoading = false;
        },
    }
})

const { actions, reducer } = userSlice
export const { setUser } = actions
export default reducer;
