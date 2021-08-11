import { createSlice } from "@reduxjs/toolkit";

export const timeSlice = createSlice({
  name: "time",
  initialState: {
    taskTime: 1500,
    breakTime: 300,
    initialBreakTime: 300,
    longBreakTime: 900,
    timeOnTask: 0,
    timeOnPause: 0,
    taskCycle: 4,
    pomodoroCount: 0,
    breaksCount: 0,
    tasksCount: 0,
    isStarted: false,
    isPaused: false,
    isBreak: false,
    isBreakPaused: false,
  },
  reducers: {
    setStop: (state) => {
      state.isStarted = false;
      state.isBreak = false;
      state.isPaused = false;
      state.isBreakPaused = false;
    },
    setIsStarted: (state, action) => {
      state.isStarted = action.payload;
      state.isPaused = !action.payload;
      state.isBreakPaused = false;
      state.isBreak = false;
    },
    setIsPaused: (state, action) => {
      state.isStarted = !action.payload;
      state.isPaused = action.payload;
    },
    setIsBreak: (state, action) => {
      state.isBreak = action.payload;
      state.isPaused = false;
      state.isBreakPaused = !action.payload;
    },
    setIsBreakPaused: (state, action) => {
      state.isBreak = !action.payload;
      state.isBreakPaused = action.payload;
    },
    increasePomodoro: (state) => {
      state.pomodoroCount++;
      state.pomodoroCount % state.taskCycle === 0 && state.breaksCount !== 0
        ? (state.breakTime = state.longBreakTime)
        : (state.breakTime = state.initialBreakTime);
    },
    increaseBreaks: (state) => {
      state.breaksCount++;
    },
    increaseTasksCount: (state) => {
      state.tasksCount++;
    },
    setSettings: (state, action) => {
      state.taskTime = action.payload.taskTime;
      state.initialBreakTime = action.payload.breakTime;
      state.longBreakTime = action.payload.longBreakDuration;
      state.taskCycle = action.payload.cycle;
    },
  },
});

export const {
  setStop,
  setIsStarted,
  setIsPaused,
  setIsBreak,
  setIsBreakPaused,
  increasePomodoro,
  increaseBreaks,
  increaseTasksCount,
  setSettings,
} = timeSlice.actions;
export default timeSlice.reducer;
