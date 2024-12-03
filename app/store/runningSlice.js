import { createSlice } from '@reduxjs/toolkit';

export const runningSlice = createSlice({
  name: 'running',
  initialState: {
    currentRun: {
      miles: 0,       // Total distance covered in miles
      time: 10,        // Total time elapsed in seconds
      calories: 0,    // Calories burned
      pace: "0'0\"",  // Average pace
      progress: "0%", // Progress towards the goal
    },
    previousRuns: [],  // Store previous runs as an array
  },
  reducers: {
    // Action to update the current run's miles
    setMiles: (state, action) => {
      state.currentRun.miles = action.payload;
    },

    // Action to update the current run's time
    setTime: (state, action) => {
      state.currentRun.time = action.payload;
    },

    // Action to update the current run's calories
    setCalories: (state, action) => {
      state.currentRun.calories = action.payload;
    },

    // Action to update the current run's pace
    setPace: (state, action) => {
      state.currentRun.pace = action.payload;
    },

    // Action to update the current run's progress
    setProgress: (state, action) => {
      state.currentRun.progress = action.payload;
    },

    // Action to save the current run to previousRuns
    saveCurrentRun: (state) => {
      state.previousRuns.push(state.currentRun);
      state.currentRun = {
        miles: 0,
        time: 0,
        calories: 0,
        pace: "0'0\"",
        progress: "0%",
      };  // Reset current run after saving
    },

    // Action to reset the current run (when starting a new one)
    resetCurrentRun: (state) => {
      state.currentRun = {
        miles: 0,
        time: 0,
        calories: 0,
        pace: "0'0\"",
        progress: "0%",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { 
  setMiles, 
  setTime, 
  setCalories, 
  setPace, 
  setProgress, 
  saveCurrentRun, 
  resetCurrentRun 
} = runningSlice.actions;

export default runningSlice.reducer;