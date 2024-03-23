import { Dispatch, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import todos from "features/todoList/todoSlice";
import visibilityFilter from "features/visibilityFilter/visibilityFilterSlice";

const rootReducer = combineReducers({
  todos,
  visibilityFilter
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer