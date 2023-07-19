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

        current_html = window.location.href.split("/"); //We get the current URL, and separate all the elements by the "/" symbol
        redirect_html = ""
        // We create a new URL by adding all the elements from the current URL apart from the last one (the task)
        for (i = 0; i < current_html.length - 1; i++) {
            redirect_html += current_html[i] + "/"
        };

        if (current_html[0].startsWith("http")) {
            save_url = "write_data_new.php"
            data_dir = "results/hearts-flowers/"
            saveData(save_url, data_dir, file_name);

        } else if (current_html[0].startsWith("file")) {
            save_url = redirect_html + "write_data_new.php"
            data_dir = redirect_html + "results/hearts-flowers/"
            jsPsych.data.get().localSave("csv", file_name);
        };

        if ("sonaid" in last_trial_data){
            sonaid = last_trial_data["sonaid"];

            if (sonaid != "0") {
                experiment_id = "579";
                credit_token = "0a0055b5997d4eaea38f2ad1aeaa0c60";
                survey_code = sonaid;

                window.location = "https://uiowa-psych.sona-systems.com/webstudy_credit.aspx?experiment_id=" + experiment_id + "&credit_token=" + credit_token + "&survey_code=" + survey_code;
            };
        };
       
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

function saveData(save_url, data_dir, file_name) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', save_url); // 'write_data_new.php' is the path to the php file described above.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({file_name: file_name, data_dir: data_dir, data: jsPsych.data.get().csv()}));
}