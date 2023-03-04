import {createSlice, PayloadAction } from "@reduxjs/toolkit"
type InitialType={userDetail:boolean}
const initialState:InitialType ={userDetail:false};
const userManagementConfig = createSlice({
    name: 'userManagementConfig',
    initialState,
    reducers: {
        userDetail:(state:InitialType,action:PayloadAction<boolean>)=>{
            return {...state,userDetail: action.payload }
        },
    }
})

// Action creators are generated for each case reducer function
export const {userDetail} = userManagementConfig.actions

export default userManagementConfig.reducer