var go_stimuli_block_practice = 1;
var no_go_stimuli_block_practice = 1;
var blocks_practice = 5;

var go_stimuli_block_main = 5; //number of go trials per block
var no_go_stimuli_block_main = 1; //number of no-go trials per block
var blocks_main = 50; //number of times the test trial blocks are shown
                      //5 go + 1 no-go x 50 = 300 test trials

var time_instructions = 10;

//We initialize jsPsych
var jsPsych = initJsPsych({
    override_safe_mode: true, //We keep this here for test purposes, as we're running the code locally for now. If we remove it, we get a warning that some jsPsych functions only work online.
    on_finish: function() {
        jsPsych.data.get().localSave("csv", "go-no-go.csv") ; //Saves data in csv
    }
});
