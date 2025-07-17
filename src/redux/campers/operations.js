import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/",
});

export const getCampers = createAsyncThunk(
  "campers/getAll",
  async ({ page = 1, limit = 4, searchParams }, { rejectWithValue }) => {
    const params = {
      page,
      limit,
    };

    if (searchParams.location && searchParams.location) {
      params.location = searchParams.location;
    }

    if (searchParams.equipment && searchParams.equipment.length > 0) {
      searchParams.equipment.forEach((item) => {
        params[item] = true;
      });
    }

    if (searchParams.form && searchParams.form) {
      params.form = searchParams.form;
    }

    try {
      const { data } = await instance.get("/campers", {
        params,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCamperInfo = createAsyncThunk(
  "campers/getInfo",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/campers/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
