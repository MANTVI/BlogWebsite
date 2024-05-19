import {configureStore}  from '@reduxjs/toolkit';
import auth from "./AuthSlice"
import AuthSlice from './AuthSlice';
// here we use redux for state mangement for storing weather user logged in or logged out 
const store=configureStore({
    reducer:{
        auth:AuthSlice

    }

})

export default store;