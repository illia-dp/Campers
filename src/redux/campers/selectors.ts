import { RootState } from "../store";

export const selectCampers = (state: RootState) => state.campers.items.items;

export const selectIsLoading = (state: RootState) => state.campers.isLoading;

export const selectError = (state: RootState) => state.campers.error;

export const selectPage = (state: RootState) => state.campers.page;

export const selectTotalPages = (state: RootState) =>
  Math.ceil(state.campers.items.total / 4);

export const selectCamperInfo = (state: RootState) => state.campers.camperInfo;

export const selectLikedCampers = (state: RootState) =>
  state.campers.likedCampers;

export const selectSearchParams = (state: RootState) =>
  state.campers.searchParams;

export const selectIsFiltersMenuOpen = (state: RootState) =>
  state.campers.filtersMenuIsOpen;

export const selectMobileMenuIsOpen = (state: RootState) =>
  state.campers.mobileMenuIsOpen;
