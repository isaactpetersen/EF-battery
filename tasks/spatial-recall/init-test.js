limit_error_to_end_task = 2;
time_instructions = 2;

//We initialize jsPsych
var jsPsych = initJsPsych({
    override_safe_mode: true, //We keep this here for test purposes, as we're running the code locally for now. If we remove it, we get a warning that some jsPsych functions only work online.
    on_finish: function() {
        jsPsych.data.get().localSave("csv", "spatial-recall.csv");
    }
});
