import { combineReducers, configureStore } from "@reduxjs/toolkit";
import landingPageSlice from "../pages/LandingPage/landingPageSlice";

const combineReducer = combineReducers({
  rocket: landingPageSlice,
});

const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;
