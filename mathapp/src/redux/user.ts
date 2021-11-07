import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const slice = createSlice({
    name: 'user',
    initialState: {
        user: {
            admitionYear: 0,
            dni: '',
            email: undefined,
            lastCourse: '',
            lastName: '',
            name: '',
            progress: [],
        },
    },
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));

            state.user = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = slice.actions;

export const getUser = (state: RootState) => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        return state.user.user;
    }
};

export default slice.reducer;
