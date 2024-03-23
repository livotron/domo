import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./rootReducer";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export type AppThunk = ThunkAction<void, RootState, undefined, Action<string>>

export default store