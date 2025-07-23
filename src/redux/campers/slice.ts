import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCamperInfo, getCampers } from "./operations";
import { CampersState, SearchParams } from "./campers.types";

const initialState: CampersState = {
  items: {
    total: 0,
    items: [],
  },
  camperInfo: null,
  isLoading: false,
  error: null,
  page: 1,
  likedCampers: [],
  searchParams: {
    location: "",
    equipment: [],
    form: "",
    transmission: "",
    engine: "",
  },
  filtersMenuIsOpen: false,
  mobileMenuIsOpen: false,
};

const slice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetPage(state) {
      state.page = 1;
    },
    toggleLike(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      if (state.likedCampers.includes(id)) {
        state.likedCampers = state.likedCampers.filter(
          (itemId) => itemId !== id
        );
      } else {
        state.likedCampers.push(id);
      }
    },
    setSearchParams(state, action: PayloadAction<SearchParams>) {
      state.searchParams = action.payload;
    },
    clearSearchParams(state) {
      state.searchParams = {
        location: "",
        equipment: [],
        form: "",
        transmission: "",
        engine: "",
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
      .addCase(getCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.total = action.payload.total;

        if (state.page === 1) {
          state.items.items = action.payload.items;
        } else {
          state.items.items = [
            ...state.items.items,
            ...action.payload.items.filter(
              (item) =>
                !state.items.items.some((existing) => existing.id === item.id)
            ),
          ];
        }
      })
      .addCase(getCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getCamperInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCamperInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.camperInfo = action.payload;
      })
      .addCase(getCamperInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
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
