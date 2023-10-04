import { createSlice, PayloadAction } from "@reduxjs/toolkit"
type InitialType = { user_permissions: string[] }
const initialState: InitialType = { user_permissions: [] };
const appConfig = createSlice({
    name: 'appConfig',
    initialState,
    reducers: {
        user_permissions: (state: InitialType, action: PayloadAction<any>) => {
            return { ...state, user_permissions: action.payload }
        },
    }
})

// Action creators are generated for each case reducer function
export const { user_permissions } = appConfig.actions

export default appConfig.reducer