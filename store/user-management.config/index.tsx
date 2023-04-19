import {createSlice, PayloadAction } from "@reduxjs/toolkit"
type InitialType={userDetail:boolean,userInfo:any}
const initialState:InitialType ={userDetail:false,userInfo:null};
const userManagementConfig = createSlice({
    name: 'userManagementConfig',
    initialState,
    reducers: {
        userDetail:(state:InitialType,action:PayloadAction<boolean>)=>{
            return {...state,userDetail: action.payload }
        },
        userInfo:(state:InitialType,action:PayloadAction<any>)=>{
            return {...state,userInfo: action.payload }
        },
    }
})

// Action creators are generated for each case reducer function
export const {userDetail,userInfo} = userManagementConfig.actions

export default userManagementConfig.reducer