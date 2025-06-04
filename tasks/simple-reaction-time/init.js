// Instructions time
const timeInstructionsPractice1 = 5;
const timeInstructionsPractice2 = 5;
const timeInstructionsTest = 5;

// Task-specific variables
const numberOfTrialsPractice = 5;
const numberOfBlocksTest = 3;
const numberOfTrialsPerBlockTest = 50;
const minAcceptableTimeRT = 125;
const thresholdTrialsBelowRT = 5;
const stim = '<div class = shapebox><div id = cross></div></div>'

const append_to_datafile = "";

const jsPsych = initJsPsych({
    on_finish: function () {
        redirectToSona();
    }
});