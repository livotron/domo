import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Direction, LoginUserProps, Partner, User, VerifyUserProps } from "./types";
import { AppDispatch, AppThunk } from "app/store";
import { getMe, getPartners, getUserByName, loginUser, verifyUser } from "./userApi";

interface userSliceState {
  user: User;
  me: User;
  partners: (Partner | undefined)[];
}

const initialState: userSliceState = {
  user: { name: "" },
  me: { name: "" },
  partners: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    receiveMe(state, action: PayloadAction<User>) {
      state.me = action.payload;
    },
    removeMe(state) {
      state.me = { name: "" };
    },
    receiveUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    receivePartners(state, action: PayloadAction<Partner[]>) {
      state.partners = [
        action.payload.find((partner) => partner.direction === Direction.up),
        action.payload.find((partner) => partner.direction === Direction.right),
        action.payload.find((partner) => partner.direction === Direction.down),
        action.payload.find((partner) => partner.direction === Direction.left),
      ];
    },
  },
});

export const fetchMe = (): AppThunk => async (dispatch: AppDispatch) => {
  const myUser = await getMe();
  dispatch(userSlice.actions.receiveMe(myUser));
};

export const fetchByName =
  (name: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    const user = await getUserByName(name);
    dispatch(userSlice.actions.receiveUser(user));
  };

export const fetchPartners =
  (): AppThunk => async (dispatch: AppDispatch, getState) => {
    const partners = await getPartners(getState().user.user.name);
    dispatch(userSlice.actions.receivePartners(partners));
  };

export const verifyPartner =
  (props: VerifyUserProps): AppThunk =>
  async (dispatch: AppDispatch, getState) => {
    const partners = await verifyUser(props);
    dispatch(userSlice.actions.receivePartners(partners));
  };

export const login =
  (props: LoginUserProps): AppThunk =>
  async (dispatch: AppDispatch, getState) => {
    const loginResponse = await loginUser(props);
    localStorage.setItem('TOKEN',loginResponse.token)
    dispatch(fetchMe());
    dispatch(userSlice.actions.receivePartners(loginResponse.partners));
  };

export const { removeMe, receiveUser } = userSlice.actions;

export default userSlice.reducer;
