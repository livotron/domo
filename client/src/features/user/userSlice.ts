import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Partner, User } from "./types";
import { AppDispatch, AppThunk } from "app/store";
import { getMe, getPartners } from "./userApi";

interface userSliceState {
  me: User,
  partners: Partner[]
} 

const initialState: userSliceState = {
  me: { name: ''},
  partners: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    receiveMe(state, action: PayloadAction<User>) {
      state.me = action.payload;
    },
    receivePartners(state, action: PayloadAction<Partner[]>) {
      state.partners = action.payload;
    },
  }
})

export const fetchMe = (): AppThunk => async (dispatch: AppDispatch) => {
  const myUser = await getMe();
  console.log(myUser)
  dispatch(userSlice.actions.receiveMe(myUser));
  dispatch(fetchPartners());
}

export const fetchPartners = (): AppThunk => async (dispatch: AppDispatch, getState) => {
  const myPartners = await getPartners(getState().user.me.name);
  console.log(myPartners)
  dispatch(userSlice.actions.receivePartners(myPartners));
}

export default userSlice.reducer;