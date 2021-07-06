import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import timeReducer from "./timeSlice";

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    time: timeReducer,
  },
});
