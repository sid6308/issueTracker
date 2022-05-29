import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import UserApi from "./userApi";

export const loadUsersAsync = createAsyncThunk(
  "users/loadUsersStatus",
  async () => {
    const response = await UserApi.getAllUsers();
    return response.data;
  }
);

export const addUserAsync = createAsyncThunk(
  "users/addUsersStatus",

  async (user, { rejectWithValue }) => {
    try {
      const response = await UserApi.saveUser(user);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUsersStatus",
  async (id) => {
    await UserApi.deleteUser(id);
    return id;
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/update",
  async (user) => {
    const response = await axios.put(
      `http://localhost:3001/users/${user.id}`,
      user
    );
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    test: [],
  },
  reducers: {},

  extraReducers: {
    [loadUsersAsync.pending]: (state) => {
      // console.log("loadUsersAsync pending...");
    },

    [loadUsersAsync.fulfilled]: (state, action) => {
      // console.log("loadUsersAsync success...");
      state.users = action.payload;
    },

    [loadUsersAsync.rejected]: (state, action) => {
      // console.log("loadUsersAsync error...");
    },

    [addUserAsync.pending]: (state) => {
      // console.log("addUserAsync pending...");
    },

    [addUserAsync.fulfilled]: (state, action) => {
      // console.log("addUserAsync success...");
      state.users.push(action.payload);
    },
    [updateUserAsync.fulfilled]: (state, action) => {
      // console.log("Updated success success...");
      state.users = state.users.map((el) =>
        el.id === action.payload.id ? action.payload : el
      );
    },
    [addUserAsync.rejected]: (state, action) => {
      // console.log("addUserAsync error...");
      throw action.payload;
    },

    [deleteUserAsync.pending]: (state) => {
      // console.log("deleteUserAsync pending...");
    },

    [deleteUserAsync.fulfilled]: (state, action) => {
      // console.log("deleteUserAsync success...");
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    [deleteUserAsync.rejected]: (state, action) => {
      // console.log("deleteUserAsync error...");
    },
  },
});

export const { updateUsers } = usersSlice.actions;
export default usersSlice.reducer;

export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.email === userId);
