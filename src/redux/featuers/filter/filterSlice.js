import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterSubmitedAssignmet: (state, action) => {
      state.status = action.payload;
    },
  },
});
export const { filterSubmitedAssignmet } = filterSlice.actions;
export default filterSlice.reducer;
