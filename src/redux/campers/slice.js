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
    searchParams: {
      location: "",
      equipment: [],
      form: "",
    },
    filtersMenuIsOpen: false,
    mobileMenuIsOpen: false,
  },
  reducers: {
    setPage(state, { payload }) {
      state.page = payload;
    },
    resetPage(state) {
      state.page = 1;
    },
    toggleLike: (state, { payload }) => {
      const { id } = payload;

      if (state.likedCampers.includes(id)) {
        state.likedCampers = state.likedCampers.filter(
          (itemId) => itemId !== id
        );
      } else {
        state.likedCampers.push(id);
      }
    },
    setSearchParams(state, { payload }) {
      state.searchParams = payload;
    },
    clearSearchParams(state) {
      state.searchParams = {
        location: "",
        equipment: [],
        form: "",
      };
    },
    openFiltersMenu(state) {
      state.filtersMenuIsOpen = true;
    },
    closeFiltersMenu(state) {
      state.filtersMenuIsOpen = false;
    },
    openMobileMenu(state) {
      state.mobileMenuIsOpen = true;
    },
    closeMobileMenu(state) {
      state.mobileMenuIsOpen = false;
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

        if (state.page === 1) {
          state.items.items = payload.items;
        } else {
          state.items.items = [
            ...state.items.items,
            ...payload.items.filter(
              (item) =>
                !state.items.items.some((existing) => existing.id === item.id)
            ),
          ];
        }
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

export const {
  setPage,
  resetPage,
  toggleLike,
  setSearchParams,
  clearSearchParams,
  openFiltersMenu,
  closeFiltersMenu,
  openMobileMenu,
  closeMobileMenu,
} = slice.actions;
export const campersReducer = slice.reducer;
