import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitialType = { enums: any };
const initialState: InitialType = { enums: {} };
const enumsConfig = createSlice({
  name: "enumsConfig",
  initialState,
  reducers: {
    enums: (
      state: InitialType,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      let _state: InitialType = state;
      _state.enums[action.payload.key] = action.payload.value;
      return _state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { enums } = enumsConfig.actions;

export default enumsConfig.reducer;
