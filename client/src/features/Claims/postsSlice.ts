import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Claim } from "./types";
import { AppDispatch, AppThunk } from "app/store";
import { writeClaim } from "./postsApi";

interface postsSliceState {
  myPosts: Claim[];
}

const initialState: postsSliceState = {
  myPosts: []
}

const postsSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {
    addMyPost(state, action: PayloadAction<Claim>) {
      state.myPosts.push(action.payload)
    }
  }
})

export const createPost = (post: Claim): AppThunk => async (dispatch: AppDispatch) => {
  const createdPost = await writeClaim(post);
  dispatch(postsSlice.actions.addMyPost(createdPost));
};

export default postsSlice.reducer