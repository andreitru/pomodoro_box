import { createSlice } from "@reduxjs/toolkit";
import { persistedSettings, persistedStat } from "./localStorage";

Date.prototype.getWeek = function () {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
    - 3 + (week1.getDay() + 6) % 7) / 7);
}

const date = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();
const day = new Date().getDay() === 0 ? 7 : new Date().getDay() + 1;
const week = new Date().getWeek();

export const timeSlice = createSlice({
  name: "time",
  initialState: {
    settings: persistedSettings,
    stat: persistedStat,
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

      const today = state.stat.find((i) => i.date === date && i.month === month && i.year === year);
      if (today) {
        today.timeOnTask += Math.round((Date.now() - state.nowTask) / 1000);
      }
    },
    setIsStarted: (state, action) => {
      const today = state.stat.find((i) => i.date === date && i.month === month && i.year === year);

      if (!today) {
        state.stat.push({
          date: date,
          month: month,
          year: year,
          day: day,
          week: week,
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
      state.settings.taskTime = action.payload.taskTime;
      state.settings.initialBreakTime = action.payload.breakTime;
      state.settings.longBreakTime = action.payload.longBreakDuration;
      state.settings.taskCycle = action.payload.cycle;
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
