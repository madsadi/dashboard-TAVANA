import {createSlice, PayloadAction } from "@reduxjs/toolkit"
type InitialType={bookBuildingResult:[]}
const initialState:InitialType ={bookBuildingResult:[]};

const bookBuildingConfig = createSlice({
    name: 'bookBuildingConfig',
    initialState,
    reducers: {
        bookBuildingResult:(state:InitialType,action:PayloadAction<[]>)=>{
            return {...state,bookBuildingResult: action.payload }
        }
    }
})

// Action creators are generated for each case reducer function
export const {bookBuildingResult} = bookBuildingConfig.actions

export default bookBuildingConfig.reducer