import {createSlice, PayloadAction } from "@reduxjs/toolkit"
type InitialType={searchResult:any}
const initialState:InitialType ={searchResult:[]};
const tradeConfig = createSlice({
    name: 'tradeConfig',
    initialState,
    reducers: {
        searchResult:(state:InitialType,action:PayloadAction<[]>)=>{
            return {...state,searchResult: action.payload }
        },
    }
})

// Action creators are generated for each case reducer function
export const {searchResult} = tradeConfig.actions

export default tradeConfig.reducer