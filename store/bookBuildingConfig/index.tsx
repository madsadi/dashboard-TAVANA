import {createSlice, PayloadAction } from "@reduxjs/toolkit"
type InitialType={bookBuildingResult:[]}
const initialState:InitialType ={bookBuildingResult:[]};

const netFlowConfig = createSlice({
    name: 'netFlowConfig',
    initialState,
    reducers: {
        bookBuildingResult:(state:InitialType,action:PayloadAction<[]>)=>{
            return {...state,bookBuildingResult: action.payload }
        }
    }
})

// Action creators are generated for each case reducer function
export const {bookBuildingResult} = netFlowConfig.actions

export default netFlowConfig.reducer