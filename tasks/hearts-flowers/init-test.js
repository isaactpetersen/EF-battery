// PARAMETERS
const practice_reps_per_side = 1;
const test_reps_per_item = 1;
const fixation_duration = 500;
const blank_duration = 500;
const response_window = 1000;
const too_slow_duration = 1500;
const time_heart_instructions_2 = 1;
const time_heart_instructions_3 = 1;
const time_heart_instructions_4 = 1;
const time_heart_instructions_6 = 1;
const time_flower_instructions_2 = 1;
const time_flower_instructions_4 = 1;
const time_mixed_instructions = 1;

const jsPsych = initJsPsych({
    on_finish: function() {
        
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

function redirectToNextPage() {

    last_trial_data = jsPsych.data.getLastTrialData().trials[0];
    if(last_trial_data["chain"] != "false"){
        if ("sonaid" in last_trial_data){
            sonaid = last_trial_data["sonaid"];

            if (sonaid != "0") {
                experiment_id = "INSERT_HERE";
                credit_token = "INSERT_HERE";
                survey_code = sonaid;

                window.location = "https://uiowa-psych.sona-systems.com/webstudy_credit.aspx?experiment_id=" + experiment_id + "&credit_token=" + credit_token + "&survey_code=" + survey_code;
            };
        };
    };  
}