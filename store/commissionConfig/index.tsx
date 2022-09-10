import {createSlice, PayloadAction } from "@reduxjs/toolkit"
type InitialType={instrumentSearchResult:any,categorySearchResult:any}
const initialState:InitialType ={instrumentSearchResult:[],categorySearchResult:[]};
const commissionConfig = createSlice({
    name: 'commissionConfig',
    initialState,
    reducers: {
        instrumentSearchResult:(state:InitialType,action:PayloadAction<[]>)=>{
            return {...state,instrumentSearchResult: action.payload }
        },
        categorySearchResult:(state:InitialType,action:PayloadAction<[]>)=>{
            return {...state,categorySearchResult: action.payload }
        },
    }
})

// Action creators are generated for each case reducer function
export const {instrumentSearchResult,categorySearchResult} = commissionConfig.actions

export default commissionConfig.reducer