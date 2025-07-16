import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/",
});

export const getCampers = createAsyncThunk(
  "campers/getAll",
  async ({ page = 1, limit = 4 }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/campers", {
        params: {
          page,
          limit,
        },
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
