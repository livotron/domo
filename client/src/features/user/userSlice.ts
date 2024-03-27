import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Partner, User } from "./types";
import { AppDispatch, AppThunk } from "app/store";
import { getMe, getPartners } from "./userApi";

interface userSliceState {
  user: User,
  partners: Partner[]
} 

const initialState: userSliceState = {
  user: { name: ''},
  partners: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    receiveMe(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    receivePartners(state, action: PayloadAction<Partner[]>) {
      state.partners = action.payload;
    },
  }
})

export const fetchMe = (): AppThunk => async (dispatch: AppDispatch) => {
  const myUser = await getMe();
  dispatch(userSlice.actions.receiveMe(myUser));
  dispatch(fetchPartners());
}

export const fetchPartners = (): AppThunk => async (dispatch: AppDispatch, getState) => {
  const partners = await getPartners(getState().user.user.name);
  dispatch(userSlice.actions.receivePartners(partners));
}

export default userSlice.reducer;