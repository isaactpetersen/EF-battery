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

        // We add the task to the URL
        redirect_html += "experiment-go-no-go-test.html";

        // We add the variables that we have in the URL
        if((window.location.href).indexOf('?') != -1) {

          var variables = window.location.href.split('?')[1]; 
          redirect_html += "?" + variables;

        };

        // We redirect to the next task
        window.location = redirect_html;    }
});
