import {createSlice, PayloadAction } from "@reduxjs/toolkit"
type InitialType={query:any}
const initialState:InitialType ={query:null};
const pageConfig = createSlice({
    name: 'pageConfig',
    initialState,
    reducers: {
        query:(state:InitialType,action:PayloadAction<any>)=>{
            return {...state,query: action.payload }
        }
    }
})

// Action creators are generated for each case reducer function
export const {query} = pageConfig.actions

export default pageConfig.reducer