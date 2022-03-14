import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import emailService from "./emailService";

const initialState = {
  emails: [],
  email: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  favorites: [],
};

//get emails

export const getEmails = createAsyncThunk(
  "emails/getAll",
  async (_, thunkAPI) => {
    try {
      return await emailService.getEmails();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getEmail = createAsyncThunk(
  "emails/getById",
  async (id, thunkAPI) => {
    try {
      return await emailService.getEmail(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.emails = action.payload;
      })
      .addCase(getEmails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.email = action.payload;
      })
      .addCase(getEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = emailSlice.actions;
export default emailSlice.reducer;
