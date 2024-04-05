import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "./types";
import { AppDispatch, AppThunk } from "app/store";
import { writePost } from "./postsApi";

interface postsSliceState {
  myPosts: Post[];
}

const initialState: postsSliceState = {
  myPosts: []
}

const postsSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {
    addMyPost(state, action: PayloadAction<Post>) {
      state.myPosts.push(action.payload)
    }
  }
})

export const createPost = (post: Post): AppThunk => async (dispatch: AppDispatch) => {
  const createdPost = await writePost(post);
  dispatch(postsSlice.actions.addMyPost(createdPost));
};

export default postsSlice.reducer