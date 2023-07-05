// PARAMETERS
const practice_reps_per_side = 6;
const test_reps_per_item = 30;
const fixation_duration = 500;
const blank_duration = 500;
const response_window = 1000;
const too_slow_duration = 1500;

const jsPsych = initJsPsych({
    override_safe_mode: true, //We keep this here for test purposes, as we're running the code locally for now. If we remove it, we get a warning that some jsPsych functions only work online.
    on_finish: function() {
        jsPsych.data.get().localSave("csv", "hearts-flowers.csv") ; //Saves data in csv
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