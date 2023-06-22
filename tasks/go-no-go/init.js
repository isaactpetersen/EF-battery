//We initialize jsPsych
var jsPsych = initJsPsych({
    override_safe_mode: true, //We keep this here for test purposes, as we're running the code locally for now. If we remove it, we get a warning that some jsPsych functions only work online.
    on_finish: function() {
        jsPsych.data.get().csv(); //Saves data in csv
    }
});

//Add fullscreen
var fullscreen_on = {
    type: jsPsychFullscreen,
    message: "This experiment must be passed in fullscreen mode.</br>"+
             "Please, do not press the ESC key during the experiment, and avoid all distractions.</br></br>"+
             "If you quit the fullscreen mode during the experiment, please press <b>F11</b> on Windows </br>"+
             "or the combination <b>Control-⌘-F</b> on Mac to come back to fullscreen.</br>",
    button_label: 'Continue',
    fullscreen_mode: true,
};

//Remove fullscreen
var fullscreen_off = {
    type: jsPsychFullscreen,
    message: "This experiment must be passed in fullscreen mode.</br>"+
             "Please, do not press the ESC key during the experiment, and avoid all distractions.</br></br>"+
             "If you quit the fullscreen mode during the experiment, please press <b>F11</b> on Windows </br>"+
             "or the combination <b>Control-⌘-F</b> on Mac to come back to fullscreen.</br>",
    button_label: 'Continue',
    fullscreen_mode: false,
};

