import { createSlice } from "@reduxjs/toolkit";
import { getCamperInfo, getCampers } from "./operations";

const slice = createSlice({
  name: "campers",
  initialState: {
    items: {
      total: 0,
      items: [],
    },
    camperInfo: [],
    isLoading: false,
    error: null,
    page: 1,
    likedCampers: [],
  },
  reducers: {
    setPage(state, { payload }) {
      state.page = payload;
    },
    resetPage(state) {
      state.page = 1;
    },
    toggleLike: (state, action) => {
      const { id } = action.payload;

      if (state.likedCampers.includes(id)) {
        state.likedCampers = state.likedCampers.filter(
          (itemId) => itemId !== id
        );
      } else {
        state.likedCampers.push(id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCampers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items.total = payload.total;

        state.items.items = [
          ...state.items.items,
          ...payload.items.filter(
            (item) =>
              !state.items.items.some((existing) => existing.id === item.id)
          ),
        ];
      })
      .addCase(getCampers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getCamperInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCamperInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.camperInfo = payload;
      })
      .addCase(getCamperInfo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { setPage, resetPage, toggleLike } = slice.actions;
export const campersReducer = slice.reducer;
