import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Camper, CamperQueryParams, CampersResponse } from "./campers.types";

export const instance = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/",
});

export const getCampers = createAsyncThunk<CampersResponse, CamperQueryParams>(
  "campers/getCampers",
  async ({ page = 1, limit = 4, searchParams }, { rejectWithValue }) => {
    const params: Record<string, any> = { page, limit };

    const addParam = (key: string, value: string | string[] | undefined) => {
      if (value && (Array.isArray(value) ? value.length > 0 : true)) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            params[item] = true;
          });
        } else {
          params[key] = value;
        }
      }
    };

    const filterKeys = [
      "location",
      "equipment",
      "form",
      "transmission",
      "engine",
    ];

    filterKeys.forEach((key) => addParam(key, searchParams[key]));

    try {
      const { data } = await instance.get<CampersResponse>("/campers", {
        params,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCamperInfo = createAsyncThunk<Camper, string>(
  "campers/getInfo",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await instance.get<Camper>(`/campers/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
