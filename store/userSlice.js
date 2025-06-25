import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isLoggedIn: false
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload,
                state.isLoggedIn = true
        },
        clearUser: (state, action) => {
            state.user = null,
                state.isLoggedIn = false
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer