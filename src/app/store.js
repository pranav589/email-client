import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "../features/emails/emailSlice";
import favReducer from "../features/favorites/favSlice";

export const store = configureStore({
  reducer: {
    emails: emailReducer,
    favs: favReducer,
  },
});
