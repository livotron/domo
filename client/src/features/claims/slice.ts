import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Claim, Dive } from "./types";
import { AppDispatch, AppThunk } from "app/store";
import {
  acknowledgeClaimCall,
  AcknowledgeClaimProps,
  callCreateDive,
  callIncrementDive,
  fetchClaims,
  getDive,
  writeClaim,
  WriteClaimProps,
} from "./api";
import { RootState } from "app/rootReducer";
import { DateTime } from "luxon";

interface claimsSliceState {
  myClaims: Claim[];
  claims: Claim[];
  myDive: Dive;
  claimsInitiated: boolean;
  loading: boolean;
}

const initialState: claimsSliceState = {
  myClaims: [],
  myDive: { createdAt: "", stopAt: "", level: 0, acknowlegmentLogs: [] },
  claims: [],
  claimsInitiated: false,
  loading: true,
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
    receiveClaims(state, action: PayloadAction<Claim[]>) {
      state.claims = action.payload;
      state.claimsInitiated = true;
    },
    cleanClaims(state) {
      state.claims = [];
    },
    pending(state) {
      state.loading = true;
    },
    fulfilled(state) {
      state.loading = false;
    },
    removeClaims() {
      return initialState;
    },
  },
});

export const createPost =
  (post: WriteClaimProps): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(claimsSlice.actions.pending());

    const createdPost = await writeClaim(post);
    dispatch(claimsSlice.actions.addMyPost(createdPost));
    dispatch(claimsSlice.actions.fulfilled());
  };

export const acknowledgeClaim =
  (props: AcknowledgeClaimProps): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(claimsSlice.actions.pending());
    const dive = await acknowledgeClaimCall(props);
    dispatch(claimsSlice.actions.receiveDive(dive));
    dispatch(claimsSlice.actions.fulfilled());
  };

export const fetchDive = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(claimsSlice.actions.pending());
  const dive = await getDive();
  if (!dive) {
    dispatch(createDive());
  } else {
    dispatch(claimsSlice.actions.receiveDive(dive));
    dispatch(claimsSlice.actions.fulfilled());
  }
};

export const getClaims =
  (): AppThunk => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(claimsSlice.actions.pending());
    const claims = await fetchClaims();
    if (
      getState().claims.myDive.level < 9 &&
      getState().claims.myDive.level > 0 &&
      !claims.length
    ) {
      console.log("diving", getState().claims.myDive);
      dispatch(incrementDive());
    } else {
      dispatch(claimsSlice.actions.receiveClaims(claims));
      dispatch(claimsSlice.actions.fulfilled());
    }
  };

export const createDive = (): AppThunk => async (dispatch: AppDispatch) => {
  const dive = await callCreateDive();
  dispatch(claimsSlice.actions.receiveDive(dive));
  dispatch(getClaims());
};

export const incrementDive = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(claimsSlice.actions.pending());
  const dive = await callIncrementDive();
  dispatch(claimsSlice.actions.receiveDive(dive));
  if (dive.level < 9) dispatch(getClaims());
  else dispatch(claimsSlice.actions.fulfilled());
};

export const { removeClaims, cleanClaims } = claimsSlice.actions;
export default claimsSlice.reducer;
