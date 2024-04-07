import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Claim, Dive } from "./types";
import { AppDispatch, AppThunk } from "app/store";
import { callCreateDive, getDive, writeClaim } from "./api";

interface claimsSliceState {
  myClaims: Claim[];
  claims: Claim[];
  myDive: Dive;
}

const initialState: claimsSliceState = {
  myClaims: [],
  myDive: { createdAt: "", stopAt: "", level: 0, acknowlegmentLogs: [] },
  claims: []
};

const claimsSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {
    addMyPost(state, action: PayloadAction<Claim>) {
      state.myClaims.push(action.payload);
    },
    receiveDive(state, action: PayloadAction<Dive>) {
      state.myDive = action.payload;
    },
    removeClaims() {
      return initialState;
    },
  },
});

export const createPost =
  (post: Claim): AppThunk =>
  async (dispatch: AppDispatch) => {
    const createdPost = await writeClaim(post);
    dispatch(claimsSlice.actions.addMyPost(createdPost));
  };

export const fetchDive = (): AppThunk => async (dispatch: AppDispatch) => {
  const dive = await getDive();
  if (!dive) {
    dispatch(createDive());
  } else {
    dispatch(claimsSlice.actions.receiveDive(dive));
  }
};

export const createDive = (): AppThunk => async (dispatch: AppDispatch) => {
  const dive = await callCreateDive();
  dispatch(claimsSlice.actions.receiveDive(dive));
};

export const { removeClaims } = claimsSlice.actions;
export default claimsSlice.reducer;
