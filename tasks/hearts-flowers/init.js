// PARAMETERS
const practice_reps_per_side = 6;
const test_reps_per_item = 30;
const fixation_duration = 500;
const blank_duration = 500;
const response_window = 1000;
const too_slow_duration = 1500;
const timeHeartInstructions1 = 5;
const timeHeartInstructions2 = 5;
const timeHeartInstructions3 = 3;
const timeHeartInstructions5 = 5;
const timeFlowerInstructions2 = 5;
const timeFlowerInstructions4 = 5;
const timeMixedInstructions = 10;

const append_to_datafile = "";
const task = "hearts-flowers";

const jsPsych = initJsPsych({
    on_finish: function () {
        let address = getCurrentURLHead();
        address += "experiment-simple-reaction-time.html";
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