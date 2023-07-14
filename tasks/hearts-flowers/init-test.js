// PARAMETERS
const practice_reps_per_side = 3;
const test_reps_per_item = 3;
const fixation_duration = 500;
const blank_duration = 500;
const response_window = 1000;
const too_slow_duration = 1500;
const time_heart_instructions_2 = 2;
const time_heart_instructions_3 = 2;
const time_heart_instructions_4 = 2;
const time_heart_instructions_6 = 2;
const time_flower_instructions_2 = 2;
const time_flower_instructions_4 = 2;
const time_mixed_instructions = 2;

const jsPsych = initJsPsych({
    override_safe_mode: true, //We keep this here for test purposes, as we're running the code locally for now. If we remove it, we get a warning that some jsPsych functions only work online.
    on_finish: function() {
        last_trial_data = jsPsych.data.getLastTrialData().trials[0];
        console.log(last_trial_data);
        file_name = "hearts-flowers";
        if ("subid" in last_trial_data){
            file_name += "-" + last_trial_data["subid"];
        };
        file_name += ".csv";

        jsPsych.data.get().localSave("csv", file_name);
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