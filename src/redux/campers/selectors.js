export const selectCampers = (state) => state.campers.items.items;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;
export const selectPage = (state) => state.campers.page;
export const selectTotalPages = (state) =>
  Math.round(state.campers.items.total / 4);
export const selectCamperInfo = (state) => state.campers.camperInfo;
export const selectLikedCampers = (state) => state.campers.likedCampers;
