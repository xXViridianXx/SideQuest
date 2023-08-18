import { createSlice } from '@reduxjs/toolkit'




// Define the initial state using that type
const initialState = {
    currentUser: 0,
    currentUserLoading: false,
}

export const userSlice = createSlice({
    name: 'currentUser',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload
        },
        setUserLoading: (state, action) => {
            state.currentUserLoading = action.payload
        },
    },
})

export const {setUser, setUserLoading} = userSlice.actions

export default userSlice.reducer