// PARAMETERS
const practice_reps_per_side = 1;
const test_reps_per_item = 1;
const fixation_duration = 500;
const blank_duration = 500;
const response_window = 1000;
const too_slow_duration = 1500;
const timeHeartInstructions1 = 1;
const timeHeartInstructions2 = 1;
const timeHeartInstructions3 = 1;
const timeHeartInstructions5 = 1;
const timeFlowerInstructions2 = 1;
const timeFlowerInstructions4 = 1;
const timeMixedInstructions = 1;

const append_to_datafile = "_test";
const task = "hearts-flowers";

const jsPsych = initJsPsych({
    on_finish: function () {
        let address = getCurrentURLHead();
        address += "experiment-simple-reaction-time-test.html";
        redirectToNextTask(address);
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