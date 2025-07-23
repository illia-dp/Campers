export interface CamperGalleryItem {
  thumb: string;
  original: string;
}

export interface CamperReview {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: CamperGalleryItem[];
  reviews: CamperReview[];
}

export interface CampersResponse {
  total: number;
  items: Camper[];
}

export interface CamperQueryParams {
  page?: number;
  limit?: number;
  searchParams: Record<string, string | string[] | undefined>;
}

export interface SearchParams {
  location: string;
  equipment: string[];
  form: string;
  transmission: string;
  engine: string;
}

export interface CampersState {
  items: CampersResponse;
  camperInfo: Camper | null;
  isLoading: boolean;
  error: string | null;
  page: number;
  likedCampers: string[];
  searchParams: SearchParams;
  filtersMenuIsOpen: boolean;
  mobileMenuIsOpen: boolean;
}
