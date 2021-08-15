export const persistedTasks = localStorage.getItem("store") ?
  JSON.parse(localStorage.getItem("store")).tasks : [];

export const persistedStat = localStorage.getItem("store") ?
  JSON.parse(localStorage.getItem("store")).time.stat : [];

export const persistedSettings = localStorage.getItem("store") ?
  JSON.parse(localStorage.getItem("store")).time.settings :
  {
    taskTime: 1500,
    breakTime: 300,
    initialBreakTime: 300,
    longBreakTime: 1800,
    taskCycle: 4,
  };