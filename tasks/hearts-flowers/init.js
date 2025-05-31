// PARAMETERS
const practice_reps_per_side = 6;
const test_reps_per_item = 30;
const fixation_duration = 500;
const blank_duration = 500;
const response_window = 1000;
const too_slow_duration = 1500;
const time_heart_instructions_2 = 5;
const time_heart_instructions_3 = 5;
const time_heart_instructions_4 = 3;
const time_heart_instructions_6 = 5;
const time_flower_instructions_2 = 5;
const time_flower_instructions_4 = 5;
const time_mixed_instructions = 10;

const append_to_datafile = "";

const jsPsych = initJsPsych({
    on_finish: function () {
        redirectToNextPage();
    }
});

const preload = {
    type: jsPsychPreload,
    images: ["tasks/hearts-flowers/heart.png", "tasks/hearts-flowers/flower.png", "tasks/hearts-flowers/keyboard.png"],
    save_trial_parameters: {
        success: false,
        timeout: false,
        failed_images: false,
        failed_video: false,
        failed_audio: false,
    },
};