import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Direction,
  LoginUserProps,
  Partner,
  User,
  VerifyUserProps,
} from "./types";
import { AppDispatch, AppThunk } from "app/store";
import {
  getMe,
  getPartners,
  getUserByName,
  loginUser,
  verifyUser,
} from "./userApi";

interface userSliceState {
  user: User;
  me: User;
  partners: (Partner | undefined)[];
  isFixed: boolean;
  loginError: boolean;
  loginLoading: boolean;
}

const initialState: userSliceState = {
  user: { name: "" },
  me: { name: "" },
  partners: [],
  isFixed: false,
  loginError: false,
  loginLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    receiveMe(state, action: PayloadAction<User>) {
      state.me = action.payload;
    },
    removeMe() {
      return initialState;
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
    toggleIsFixed(state) {
      state.isFixed = !state.isFixed;
    },
    loginPending(state) {
      state.loginError = false;
      state.loginLoading = true;
    },
    loginRejected(state) {
      state.loginError = true;
      state.loginLoading = false;
    },
    loginFulfilled(state) {
      state.loginLoading = false;
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
  async (dispatch: AppDispatch) => {
    const partners = await verifyUser(props);
    dispatch(userSlice.actions.receivePartners(partners));
  };

export const login =
  (props: LoginUserProps): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(userSlice.actions.loginPending());
      const loginResponse = await loginUser(props);
      localStorage.setItem("TOKEN", loginResponse.token);
      dispatch(receiveUser({ name: props.name }));
      dispatch(fetchMe());
      dispatch(userSlice.actions.loginFulfilled());
      dispatch(userSlice.actions.receivePartners(loginResponse.partners));
    } catch (e) {
      dispatch(userSlice.actions.loginRejected());
      console.log(e);
    }
  };

export const { removeMe, receiveUser, toggleIsFixed } = userSlice.actions;

export default userSlice.reducer;
