import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import IssueApi from "./issueApi";

export const loadIssuesAsync = createAsyncThunk(
  "issues/loadIssuesStatus",
  async () => {
    const response = await IssueApi.getAllIssues();
    return response.data;
  }
);

export const addIssueAsync = createAsyncThunk(
  "issues/addIssueStatus",

  async (issue, { rejectWithValue }) => {
    try {
      const response = await IssueApi.saveIssue(issue);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteIssueAsync = createAsyncThunk(
  "issues/deleteIssuesStatus",
  async (id) => {
    await IssueApi.deleteIssue(id);
    return id;
  }
);

export const updateIssueAsync = createAsyncThunk(
  "issues/update",
  async (issue) => {
    const response = await axios.put(
      `http://localhost:3001/issues/${issue.id}`,
      issue
    );
    return response.data;
  }
);

export const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    issues: [],
    users: [],
    iseverity: true,
    istatus: true,
    icdate: true,
    irdate: true,
  },
  reducers: {},

  extraReducers: {
    [loadIssuesAsync.pending]: (state) => {
      // console.log("loadIssuesAsync pending...");
    },

    [loadIssuesAsync.fulfilled]: (state, action) => {
      // console.log("loadIssuesAsync success...");
      state.issues = action.payload;
    },

    [loadIssuesAsync.rejected]: (state, action) => {
      // console.log("loadIssuesAsync error...");
    },

    [addIssueAsync.pending]: (state) => {
      // console.log("addIssueAsync pending...");
    },

    [addIssueAsync.fulfilled]: (state, action) => {
      // console.log("addIssueAsync success...");
      state.issues.push(action.payload);
    },
    [updateIssueAsync.fulfilled]: (state, action) => {
      // console.log("Updated success success...");
      state.issues = state.issues.map((el) =>
        el.id === action.payload.id ? action.payload : el
      );
    },
    [addIssueAsync.rejected]: (state, action) => {
      // console.log("addIssueAsync error...");
      throw action.payload;
    },

    [deleteIssueAsync.pending]: (state) => {
      // console.log("deleteIssueAsync pending...");
    },

    [deleteIssueAsync.fulfilled]: (state, action) => {
      // console.log("deleteIssueAsync success...");
      state.issues = state.issues.filter(
        (issue) => issue.id !== action.payload
      );
    },
    [deleteIssueAsync.rejected]: (state, action) => {
      // console.log("deleteIssueAsync error...");
    },
  },
});

export const { updateIssues } = issuesSlice.actions;
export default issuesSlice.reducer;

export const selectIssueById = (state, issueId) =>
  state.issues.issues.find((issue) => issue.id === issueId);
