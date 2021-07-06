import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: [
    {
      title: "Сверстать сайт",
      id: 1,
      count: 2,
    },
  ],
  reducers: {
    newTask: (state, action) => {
      state.push({
        title: action.payload,
        id: Date.now(),
        count: 1,
      });
    },
    increaseCount: (state, action) => {
      const task = state.find((item) => item.id === action.payload);
      task.count++;
    },
    decreaseCount: (state, action) => {
      const task = state.find((item) => item.id === action.payload);
      task.count--;
    },
    editTask: (state, action) => {
      const task = state.find((item) => item.id === action.payload.id);
      task.title = action.payload.title;
    },
    deleteTask: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { newTask, increaseCount, decreaseCount, editTask, deleteTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
