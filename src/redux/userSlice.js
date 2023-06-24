import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:null,
        allUsers: [],
        allChats: [],
        selectedChatBox: null,
    },
    reducers: {
        SetUser : (state, action) => {
            state.user = action.payload
        },
        SetAllUsers: (state, action) =>{
            state.allUsers = action.payload;
        },
        SetAllChats : (state, action) => {
            state.allChats = action.payload
        },
        SetSelectedChatBox : (state, action) => {
            state.selectedChatBox = action.payload
        }
    }
})

export const {SetUser, SetAllUsers, SetAllChats, SetSelectedChatBox} = userSlice.actions;
export default userSlice.reducer;

