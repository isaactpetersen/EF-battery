var go_stimuli_block_practice = 1;
var no_go_stimuli_block_practice = 1;
var blocks_practice = 1;

var go_stimuli_block_main = 1; //number of go trials per block
var no_go_stimuli_block_main = 1; //number of no-go trials per block
var blocks_main = 1; //number of times the test trial blocks are shown
                      //5 go + 1 no-go x 50 = 300 test trials

var time_instructions = 1;

const append_to_datafile = "_test";

//We initialize jsPsych
var jsPsych = initJsPsych({
    on_finish: function() {

        current_html = window.location.href.split("/"); //We get the current URL, and separate all the elements by the "/" symbol
        address = ""
        // We create a new URL by adding all the elements from the current URL apart from the last one (the task)
        for (i = 0; i < current_html.length - 1; i++) {
            address += current_html[i] + "/"
        };

        // We add the task to the URL
        address += "experiment-hearts-flowers-test.html";
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