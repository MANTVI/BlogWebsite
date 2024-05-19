import {createSlice, nanoid } from '@reduxjs/toolkit';
// import { act } from 'react';

// use fro user authentication 
const initialState = {
    status:false,
    userData:null

}

const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{ // actions
        login:(state,action)=>{
            state.status=true,
            state.userData= action.payload.userData; // change user data
        },
        logout:(state)=>{
            state.status=false,
            state.userData=null

        }
    }
})

export const {logout,login}=authSlice.actions;
export default authSlice.reducer;

