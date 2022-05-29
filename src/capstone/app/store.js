import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "../components/issuesSlice";
import usersReducer from "../components/usersSlice";

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    users: usersReducer,
  },
});
