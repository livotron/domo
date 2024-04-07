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
import { fetchDive } from "features/claims/slice";

interface userSliceState {
  user: User;
  me: User;
  partners: User[];
  isFixed: boolean;
  isError: boolean;
  isLoading: boolean;
}

const initialState: userSliceState = {
  user: { name: "" },
  me: { name: "" },
  partners: [{ name: "" }, { name: "" }, { name: "" }, { name: "" }],
  isFixed: false,
  isError: false,
  isLoading: false,
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
        action.payload.find((partner) => partner.direction === Direction.up)
          ?.user || { name: "" },
        action.payload.find((partner) => partner.direction === Direction.right)
          ?.user || { name: "" },
        action.payload.find((partner) => partner.direction === Direction.down)
          ?.user || { name: "" },
        action.payload.find((partner) => partner.direction === Direction.left)
          ?.user || { name: "" },
      ];
    },
    toggleIsFixed(state) {
      state.isFixed = !state.isFixed;
    },
    loginPending(state) {
      state.isError = false;
      state.isLoading = true;
    },
    loginRejected(state) {
      state.isError = true;
      state.isLoading = false;
    },
    loginFulfilled(state) {
      state.isLoading = false;
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
      dispatch(userSlice.actions.receiveMe({ name: props.name }));
      dispatch(fetchMe());
      dispatch(fetchDive());
      dispatch(userSlice.actions.loginFulfilled());
      dispatch(fetchPartners());
    } catch (e) {
      dispatch(userSlice.actions.loginRejected());
      console.log(e);
    }
  };

export const { removeMe, receiveUser, toggleIsFixed } = userSlice.actions;

export default userSlice.reducer;
