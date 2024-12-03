import { save_current_run } from '../actions/index';

const initialState = {
    currentRun: {
      miles: 0,       // Total distance covered in miles
      time: 0,        // Total time elapsed in seconds
      calories: 0,    // Calories burned
      pace: "0'0\"",  // Average pace
      progress: "0%", // Progress towards the goal
    },
    previousRuns: [],  // Store previous runs as an array
  };
  

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case save_current_run:
            console.log('Reducer: Saving current run data:', action.data);
            return {
                ...state, // Retain existing state
                currentRun: { 
                    ...state.currentRun, 
                    ...action.data // Merge incoming data into the current run
                }
            };
        default:
            return state; // Return unchanged state for unknown actions
    }
};


