import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RelatedPosts } from "pages/api/snippets/[id]/related";
import type { RootState } from "./store";

export interface RelatedPostsState {
  data: { [key in string]: RelatedPosts };
  status: "initial" | "loading" | "failed" | "succeeded";
}

const initialState: RelatedPostsState = {
  data: {},
  status: "initial",
};

export const fetchRelatedPosts = createAsyncThunk(
  "post/getRelated",
  async (postId: number) => {
    const relatedPostsRes = await fetch(`/api/snippets/${postId}/related`, {
      method: "GET",
    });

    if (!relatedPostsRes.ok) {
      const message = `An error has occurred while fetching likes for post ${postId}: ${likesRes.status}`;
      throw new Error(message);
    }

    const { nextPost, previousPost } = await relatedPostsRes.json();

    return { postId, nextPost, previousPost };
  }
);

export const relatedPostsSlice = createSlice({
  name: "related",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRelatedPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRelatedPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data[action.payload.postId] = {
          nextPost: action.payload.nextPost,
          previousPost: action.payload.previousPost,
        };
      })
      .addCase(fetchRelatedPosts.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const selectRelatedPosts = (state: RootState) => state.relatedPosts.data;
export const selectRelatedPostsStatus = (state: RootState) =>
  state.relatedPosts.status;

export default relatedPostsSlice.reducer;
