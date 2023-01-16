import {createSlice, PayloadAction } from "@reduxjs/toolkit"
type InitialType={instrumentSearchResult:any,categorySearchResult:any,commission:[]}
const initialState:InitialType ={instrumentSearchResult:[],categorySearchResult:[],commission:[]};
const commissionConfig = createSlice({
    name: 'commissionConfig',
    initialState,
    reducers: {
        instrumentSearchResult:(state:InitialType,action:PayloadAction<[]>)=>{
            return {...state,instrumentSearchResult: action.payload }
        },
        categorySearchResult:(state:InitialType,action:PayloadAction<any>)=>{
            return {...state,categorySearchResult: action.payload }
        },
        commission:(state:InitialType,action:PayloadAction<[]>)=>{
            return {...state,commission: action.payload }
        },
    }
})

// Action creators are generated for each case reducer function
export const {instrumentSearchResult,categorySearchResult,commission} = commissionConfig.actions

export default commissionConfig.reducer