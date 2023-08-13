limit_error_to_end_task = 1;
time_instructions = 1;

const append_to_datafile = "_test";

//We initialize jsPsych
var jsPsych = initJsPsych({
    on_finish: function() {

        current_html = window.location.href.split("/");
        address = ""
        
        for (i = 0; i < current_html.length - 1; i++) {
            address += current_html[i] + "/"
        };

        address += "experiment-go-no-go-test.html";
        redirectToNextPage(address);

    }
});

function redirectToNextPage(address) {

    if((window.location.href).indexOf('?') != -1) {
        var variables = window.location.href.split('?')[1]; 
        address += "?" + variables;
    };

    last_trial_data = jsPsych.data.getLastTrialData().trials[0];
    if(last_trial_data["chain"] != "false"){
        window.location = address;
    };  

}