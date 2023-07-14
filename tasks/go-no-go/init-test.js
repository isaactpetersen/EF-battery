var go_stimuli_block_practice = 1;
var no_go_stimuli_block_practice = 1;
var blocks_practice = 3;

var go_stimuli_block_main = 5; //number of go trials per block
var no_go_stimuli_block_main = 1; //number of no-go trials per block
var blocks_main = 3; //number of times the test trial blocks are shown
                      //5 go + 1 no-go x 50 = 300 test trials

var time_instructions = 3;

//We initialize jsPsych
var jsPsych = initJsPsych({
    override_safe_mode: true, //We keep this here for test purposes, as we're running the code locally for now. If we remove it, we get a warning that some jsPsych functions only work online.
    on_finish: function() {
        last_trial_data = jsPsych.data.getLastTrialData().trials[0];
        console.log(last_trial_data);
        file_name = "go-no-go";
        if ("subid" in last_trial_data){
            file_name += "-" + last_trial_data["subid"];
        };
        file_name += ".csv";

        jsPsych.data.get().localSave("csv", file_name);

        current_html = window.location.href.split("/");
        redirect_html = ""
        for (i = 0; i < current_html.length - 1; i++) {
            redirect_html += current_html[i] + "/"
        };

        redirect_html += "experiment-hearts-flowers-test.html";

        add_ampersand = false;
        if ("src" in last_trial_data){
            redirect_html += "?" + last_trial_data["src"];
            add_ampersand = true;
        };
        if ("subid" in last_trial_data){
            if (add_ampersand){
                redirect_html += "&" + last_trial_data["subid"];
            } else {
                redirect_html += "?" + last_trial_data["subid"];
                add_ampersand = true;
            };
        };
        if ("sonaid" in last_trial_data){
            if (add_ampersand){
                redirect_html += "&" + last_trial_data["sonaid"];
            } else {
                redirect_html += "?" + last_trial_data["sonaid"];
                add_ampersand = true;
            };
        };

        window.location = redirect_html;
    }
});
