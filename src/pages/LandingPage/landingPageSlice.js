import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllrockets } from "../../redux/services/landingPageServices";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const initialState = {
  rockets: [],
};

export const getRockets = createAsyncThunk("user/booking", async () => {
  return await getAllrockets();
});

const landingPageSlice = createSlice({
  name: "landingPageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRockets.fulfilled, (state, action) => {
      state.rockets = action?.payload?.data;
    });
  },
});

export default landingPageSlice.reducer;

export const selectRockets = (state) => state.rocket.rockets;

export const useRockets = () => {
  const rockets = useSelector(selectRockets);
  return useMemo(() => rockets, [rockets]);
};
