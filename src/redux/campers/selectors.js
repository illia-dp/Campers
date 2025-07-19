export const selectCampers = (state) => state.campers.items.items;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;
export const selectPage = (state) => state.campers.page;
export const selectTotalPages = (state) =>
  Math.ceil(state.campers.items.total / 4);
export const selectCamperInfo = (state) => state.campers.camperInfo;
export const selectLikedCampers = (state) => state.campers.likedCampers;
export const selectSearchParams = (state) => state.campers.searchParams;
export const selectIsFiltersMenuOpen = (state) =>
  state.campers.filtersMenuIsOpen;
export const selectMobileMenuIsOpen = (state) => state.campers.mobileMenuIsOpen;
