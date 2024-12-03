export const SAVE_CURRENT_RUN = 'SAVE_CURRENT_RUN';

// Action creator for saving the current run
export const save_current_run = (data) => {
    return {
        type: SAVE_CURRENT_RUN,
        data, // Pass data for the current run
    };
};
