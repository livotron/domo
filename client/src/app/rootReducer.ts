import { Dispatch, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import todos from "features/todoList/todoSlice";
import visibilityFilter from "features/visibilityFilter/visibilityFilterSlice";
import user from "features/user/userSlice";
import claims from "features/Claims/slice";

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  user,
  claims,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
