limit_error_to_end_task = 2;
time_instructions = 2;

//We initialize jsPsych
var jsPsych = initJsPsych({
    override_safe_mode: true, //We keep this here for test purposes, as we're running the code locally for now. If we remove it, we get a warning that some jsPsych functions only work online.
    on_finish: function() {
        last_trial_data = jsPsych.data.getLastTrialData().trials[0];
        console.log(last_trial_data);
        file_name = "spatial-recall";
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

        redirect_html += "experiment-go-no-go-test.html";

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
