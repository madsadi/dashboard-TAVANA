import {createSlice, PayloadAction } from "@reduxjs/toolkit"
type InitialType={clearedTradesResult:[]}
const initialState:InitialType ={clearedTradesResult:[]};

const netFlowConfig = createSlice({
    name: 'netFlowConfig',
    initialState,
    reducers: {
        clearedTradesResult:(state:InitialType,action:PayloadAction<[]>)=>{
            return {...state,clearedTradesResult: action.payload }
        }
    }
})

// Action creators are generated for each case reducer function
export const {clearedTradesResult} = netFlowConfig.actions

export default netFlowConfig.reducer