import { createSlice } from "@reduxjs/toolkit";

const date = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();
const day = new Date().getDay();

export const timeSlice = createSlice({
  name: "time",
  initialState: {
    taskTime: 20,
    breakTime: 10,
    initialBreakTime: 10,
    longBreakTime: 10,
    stat: [
      {
        date: 11,
        month: 7,
        year: 2021,
        day: 3,
        timeOnTask: 0,
        timeOnPause: 0,
        pomodoroCount: 0,
        breaksCount: 0,
        tasksCount: 0,
      }
    ],
    taskCycle: 4,
    isStarted: false,
    isPaused: false,
    isBreak: false,
    isBreakPaused: false,
    nowTask: 0,
    nowBreak: 0,
  },
  reducers: {
    setStop: (state) => {
      state.isStarted = false;
      state.isBreak = false;
      state.isPaused = false;
      state.isBreakPaused = false;
    },
    setIsStarted: (state, action) => {
      const today = state.stat.find((i) => i.date === date && i.month === month && i.year === year);

      if (!today) {
        state.stat.push({
          date: date,
          month: month,
          year: year,
          day: day,
          timeOnTask: 0,
          timeOnPause: 0,
          pomodoroCount: 0,
          breaksCount: 0,
          tasksCount: 0,
          stopsCount: 0,
        });
      }
      state.isStarted = action.payload;
      state.isPaused = !action.payload;
      state.isBreakPaused = false;
      state.isBreak = false;
      if (state.isStarted) {
        state.nowTask = Date.now();
      }
    },
    setIsPaused: (state, action) => {
      const today = state.stat.find((i) => i.date === date && i.month === month && i.year === year);
      today.timeOnTask += Math.round((Date.now() - state.nowTask) / 1000);
      state.isStarted = !action.payload;
      state.isPaused = action.payload;
    },
    setIsBreak: (state, action) => {
      state.isBreak = action.payload;
      state.isPaused = false;
      state.isBreakPaused = !action.payload;
      const today = state.stat.find((i) => i.date === date && i.month === month && i.year === year);
      if (state.isBreak) {
        state.nowBreak = Date.now();
      }
    },
    setIsBreakPaused: (state, action) => {
      const today = state.stat.find((i) => i.date === date && i.month === month && i.year === year);
      today.timeOnPause += Math.round((Date.now() - state.nowBreak) / 1000);
      state.isBreak = !action.payload;
      state.isBreakPaused = action.payload;
    },
    increasePomodoro: (state) => {
      const today = state.stat.find((i) => i.date === date && i.month === month && i.year === year);
      today.pomodoroCount++;
      today.timeOnTask += Math.round((Date.now() - state.nowTask) / 1000);
      today.pomodoroCount % state.taskCycle === 0 && today.breaksCount !== 0
        ? (state.breakTime = state.longBreakTime)
        : (state.breakTime = state.initialBreakTime);
    },
    increaseBreaks: (state) => {
      const today = state.stat.find((i) => i.date === date && i.month === month && i.year === year);
      today.breaksCount++;
      today.timeOnPause += Math.round((Date.now() - state.nowBreak) / 1000);
    },
    increaseTasksCount: (state) => {
      const today = state.stat.find((i) => i.date === date && i.month === month && i.year === year);
      today.tasksCount++;
    },
    increaseStopsCount: (state) => {
      const today = state.stat.find((i) => i.date === date && i.month === month && i.year === year);
      today.stopsCount++;
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
  increaseStopsCount,
  setSettings,
} = timeSlice.actions;
export default timeSlice.reducer;
