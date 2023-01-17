import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllShips } from "../../redux/services/landingPageServices";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const initialState = {
  ships: [],
  totalData: [],
  isLoading: false,
  shipTypeList: [],
};

export const getShips = createAsyncThunk("ship/getAllShips", async (param) => {
  return await getAllShips(param);
});

const landingPageSlice = createSlice({
  name: "landingPageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShips.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getShips.fulfilled, (state, action) => {
      let newFilterData = action?.payload?.data.filter((x) => {
        let search = true;
        let type = true;
        let home_port = true;
        if (action?.meta?.arg?.search) {
          if (
            x.name
              .toLowerCase()
              .search(action?.meta?.arg?.search?.toLowerCase()) > -1
          ) {
            search = true;
          } else {
            search = false;
          }
        }
        if (action?.meta?.arg?.home_port) {
          if (
            x.home_port
              .toLowerCase()
              .search(action?.meta?.arg?.home_port?.toLowerCase()) > -1
          ) {
            home_port = true;
          } else {
            home_port = false;
          }
        }
        if (action?.meta?.arg?.type) {
          if (x?.type === action?.meta?.arg?.type) {
            type = true;
          } else {
            type = false;
          }
        }
        return search && type && home_port;
        // return (
        //   action?.meta?.arg?.search ? x.name.toLowerCase().search(action?.meta?.arg?.search?.toLowerCase()) > -1 : true && action?.meta?.arg?.type ? x?.type === action?.meta?.arg?.type : true && action?.meta?.arg?.home_port ? x?.home_port.toLowerCase().search(action?.meta?.arg?.home_port?.toLowerCase()) > -1 : true
        // );
      });

      state.totalData =
        action?.meta?.arg?.search ||
        action?.meta?.arg?.type ||
        action?.meta?.arg?.home_port
          ? newFilterData
          : action?.payload?.data;

      const fi = (action?.meta?.arg?.page - 1) * action?.meta?.arg?.limit;
      const li = fi + action?.meta?.arg?.limit;

      let newData =
        action?.meta?.arg?.search ||
        action?.meta?.arg?.type ||
        action?.meta?.arg?.home_port
          ? newFilterData.slice(fi, li)
          : action?.payload?.data.slice(fi, li);
      state.ships = newData;

      let shipList = [];

      action?.payload?.data.forEach((item) => {
        let selected = shipList?.find((val) => val.value === item.type);
        if (!selected) {
          shipList.push({ value: item.type, label: item.type });
        }
        state.shipTypeList = shipList;
      });

      state.isLoading = false;
    });
    builder.addCase(getShips.rejected, (state) => {
      state.ships = [];
      state.totalData = [];
      state.isLoading = false;
    });
  },
});

export default landingPageSlice.reducer;

export const selectShips = (state) => state.ship;

export const useShips = () => {
  const ships = useSelector(selectShips);
  return useMemo(() => ships, [ships]);
};
