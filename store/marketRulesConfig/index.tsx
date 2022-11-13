import {createSlice, PayloadAction } from "@reduxjs/toolkit"
type InitialType={shouldEditObject:any}
const initialState:InitialType ={shouldEditObject:null};
const marketRulesConfig = createSlice({
    name: 'marketRulesConfig',
    initialState,
    reducers: {
        shouldEditObject:(state:InitialType,action:PayloadAction<any>)=>{
            return {...state,shouldEditObject: action.payload }
        }
    }
})

// Action creators are generated for each case reducer function
export const {shouldEditObject} = marketRulesConfig.actions

export default marketRulesConfig.reducer