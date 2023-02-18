import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface LikesState {
  data: { [key in string]: number };
  status: "initial" | "loading" | "failed" | "succeeded";
}

const initialState: LikesState = {
  data: {},
  status: "initial",
};

export const fetchLikes = createAsyncThunk(
  "post/getLikes",
  async (postId: number) => {
    const likesRes = await fetch(`/api/snippets/${postId}/likes`, {
      method: "GET",
    });

    if (!likesRes.ok) {
      const message = `An error has occurred while fetching likes for post ${postId}: ${likesRes.status}`;
      throw new Error(message);
    }

    const { likes } = await likesRes.json();

    return { postId, likes };
  }
);

export const updateLikes = createAsyncThunk(
  "post/updateLikes",
  async (params: { postId: number; action: "add" | "remove" }) => {
    const { postId, action } = params;
    const likesRes = await fetch(`/api/snippets/${postId}/likes`, {
      method: "POST",
      body: JSON.stringify({
        action,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!likesRes.ok) {
      const message = `An error has occurred while updating likes for post ${postId}: ${likesRes.status}`;
      throw new Error(message);
    }

    const { likes } = await likesRes.json();
    return { postId, likes };
  }
);

export const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLikes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data[action.payload.postId] = action.payload.likes;
      })
      .addCase(fetchLikes.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateLikes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateLikes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data[action.payload.postId] = action.payload.likes;
      })
      .addCase(updateLikes.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const selectLikes = (state: RootState) => state.likes.data;
export const selectLikesStatus = (state: RootState) => state.likes.status;

export default likesSlice.reducer;
